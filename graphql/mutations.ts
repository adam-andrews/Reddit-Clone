import { gql } from '@apollo/client';

export const ADD_POST = gql`
	mutation AddPost(
		$body: String!
		$image: String!
		$subreddit_id: ID!
		$title: String!
		$username: String!
	) {
		insertPost(
			body: $body
			image: $image
			subreddit_id: $subreddit_id
			title: $title
			username: $username
		)
        {
            body,
            created_at,
            image,
            subreddit_id,
            title,
            username
        }
	}
`;
