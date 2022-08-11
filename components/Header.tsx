import React from 'react';
import Image from 'next/image';
import {
	MenuIcon,
	ChevronDownIcon,
	HomeIcon,
	SearchIcon,
} from '@heroicons/react/solid';
import {
	BellIcon,
	ChatIcon,
	GlobeIcon,
	PlusIcon,
	SparklesIcon,
	SpeakerphoneIcon,
	VideoCameraIcon,
} from '@heroicons/react/outline';
import { signIn } from 'next-auth/react';

function Header() {
	return (
		<div className="flex sticky top-0 z-50 bg-white px-4 py-2 shadow-sm">
			<div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
				<Image
					src="https://links.papareact.com/fqy"
					objectFit="contain"
					layout="fill"
				/>
			</div>

			<div className="flex items-center mx-7 xl:min-w-[300px]">
				<HomeIcon className="h-5 w-5" />
				<p className="flex-1 hidden ml-2 lg:inline">Home</p>
				<ChevronDownIcon className="h-5 w-5" />
			</div>

			<form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
				<SearchIcon className="h-6 w-6 text-gray-400" />
				<input
					className="flex-1 bg-transparent"
					type="text"
					placeholder="Search Reddit"
				/>
				<button type="submit" hidden></button>
			</form>

			<div className="items-center space-x-2 text-gray-500 hidden lg:inline-flex">
				<BellIcon className="icon" />
				<ChatIcon className="icon" />
				<GlobeIcon className="icon" />
				<PlusIcon className="icon" />
				<SparklesIcon className="icon" />
				<SpeakerphoneIcon className="icon" />
				<VideoCameraIcon className="icon" />
			</div>
			<div className="inline-flex lg:hidden items-center ml-5">
				<MenuIcon className="icon" />
			</div>

			{/* {Sign in Sign Out} */}
			<div
				onClick={() => signIn()}
				className="hidden items-center lg:flex space-x-2 border border-gray-100 p-2 cursor-pointer"
			>
				<div className="relative h-5 w-5 flex-shrink-0 cursor-pointer">
					<Image
						objectFit="contain"
						src="https://links.papareact.com/23l"
						layout="fill"
						alt=""
					/>
				</div>
				<p className="text-gray-400"> Sign In</p>
			</div>
		</div>
	);
}

export default Header;
