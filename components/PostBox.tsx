import React, { cloneElement } from 'react';
import { useSession } from 'next-auth/react';
import Avatar from './Avatar';
import { PhotographIcon, LinkIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import client from '../apollo-client';
import { GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';

type FormData = {
	postTitle: string;
	postBody: string;
	postImage: string;
	subreddit: string;
};
function PostBox() {
	const { data: session } = useSession();
	const [imageBoxOpen, setImageBoxOpen] = React.useState<boolean>(false);
	const [addPost] = useMutation(ADD_POST);
	const [addSubreddit] = useMutation(ADD_SUBREDDIT);

	const {
		register,
		setValue,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit = handleSubmit(async (formData) => {
		try {
			//Query for subreddit topic
			const {
				data: { getSubredditListByTopic },
			} = await client.query({
				query: GET_SUBREDDIT_BY_TOPIC,
				variables: {
					topic: formData.subreddit,
				},
			});

			const subredditExists = getSubredditListByTopic.length > 0;
			if (!subredditExists) {
				const {
					data: { insertSubreddit: newSubreddit },
				} = await addSubreddit({
					variables: {
						name: formData.subreddit,
					},
				});

				console.log(formData);
				const image = formData.postImage || '';

				const {
					data: { insertPost: newPost },
				} = await addPost({
					variables: {
						title: formData.postTitle,
						body: formData.postBody,
						image: image,
						subreddit_id: newSubreddit.id,
						username: session?.user?.name,
					},
				});

				console.log('newPost', newPost);
			} else {
				// Use Existing Subreddit
				console.log('use existing subreddit');
				console.log(getSubredditListByTopic);
				const image = formData.postImage || '';
				const {
					data: { insertPost: newPost },
				} = await addPost({
					variables: {
						title: formData.postTitle,
						body: formData.postBody,
						image: formData.postImage,
						subreddit: getSubredditListByTopic[0].id,
						user: session?.user?.name,
					},
				});
			}

            setValue('postTitle', '');
            setValue('postBody', '');
            setValue('postImage', '');
            setValue('subreddit', '');
            
		} catch (err) {
			console.log(err);
		}
	});

	return (
		<form
			onSubmit={onSubmit}
			className="sticky top-16 z-50 border rounded-md border-gray-300 bg-white p-2"
		>
			<div className="flex items-center space-x-3">
				{/* Avatar */}
				<Avatar />
				<input
					{...register('postTitle', { required: true })}
					disabled={!session}
					className="flex-1 rounded-md bg-gray-50 p-2 pl-5 outline-none"
					type="text"
					placeholder={
						session ? 'Create a post by entering a title' : 'Login to post'
					}
				/>
				<PhotographIcon
					onClick={() => setImageBoxOpen(!imageBoxOpen)}
					className={`h-6 cursor-pointer text-gray-300 ${
						imageBoxOpen && 'text-blue-300'
					}`}
				/>
				<LinkIcon className="h-6 text-gray-300" />
			</div>

			{!!watch('postTitle') && (
				<div className="flex flex-col py-2">
					<div className="flex items-center px-2">
						<p className="min-w-[90px]">Body:</p>
						<input
							className="m-2 flex-1 p-2 outline-none"
							{...register('postBody')}
							type="text"
							placeholder="Enter a body(Optional)"
						/>
					</div>
					<div className="flex items-center px-2">
						<p className="min-w-[90px]">Subreddit:</p>
						<input
							className="m-2 flex-1 p-2 outline-none"
							{...register('subreddit', { required: true })}
							type="text"
							placeholder="i.e Next.js"
						/>
					</div>
					{imageBoxOpen && (
						<div className="flex items-center px-2">
							<p className="min-w-[90px]">Image:</p>
							<input
								className="m-2 flex-1 p-2 outline-none"
								{...register('postImage')}
								type="text"
								placeholder="Optional..."
							/>
						</div>
					)}

					{Object.keys(errors).length > 0 && (
						<div className="space-y-2 p-2 text-red-500">
							{errors.postTitle?.type === 'required' && (
								<p>Title is required</p>
							)}
							{errors.subreddit?.type === 'required' && (
								<p>Subreddit is required</p>
							)}
						</div>
					)}
					{!!watch('postTitle') && (
						<button
							type="submit"
							className="w-full rounded-full bg-blue-400 p-2 text-white "
						>
							Create Post
						</button>
					)}
				</div>
			)}
		</form>
	);
}

export default PostBox;
