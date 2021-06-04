import * as React from 'react';

const Header = ({ children, onToggleMenu }) => {
	return (
		<header className="flex justify-between items-center py-4 px-4 md:px-16 lg:px-24 bg-white border-b-4 border-gray-200">
			<div className="flex items-center justify-between">
				<button className="text-gray-500 focus:outline-none lg:hidden" onClick={onToggleMenu}>
					<svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M4 6H20M4 12H20M4 18H11"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						></path>
					</svg>
				</button>
				{children}
			</div>
			<div className="relative">
				<button className="relative block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none">
					<img
						className="h-full w-full object-cover"
						src="https://ui-avatars.com/api/?name=John+Doe"
						alt="Your avatar"
					/>
				</button>

				<div
					style={{ display: 'none' }}
					className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10"
				>
					<a
						href="/login"
						className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
					>
						Logout
					</a>
				</div>
			</div>
		</header>
	);
};

Header.defaultProps = {
	expanded: true,
};

export default Header;
