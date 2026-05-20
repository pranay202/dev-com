import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '../store/GlobalState';
import Cookie from 'js-cookie';

function NavBar() {
	const router = useRouter();
	const { state, dispatch } = useContext(DataContext);
	const { auth, cart } = state;

	const isActive = (r) => {
		if (r === router.pathname) {
			return ' active';
		} else {
			return '';
		}
	};

	const handleLogout = () => {
		Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' });
		localStorage.removeItem('firstLogin');
		dispatch({ type: 'AUTH', payload: {} });
		dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } });
		return router.push('/');
	};

	const adminRouter = () => {
		return (
			<>
				<Link href="/users" className="dropdown-item">
					<i className="fas fa-users-cog" aria-hidden="true"></i> Users
				</Link>
				<Link href="/create" className="dropdown-item">
					<i className="fas fa-box-open" aria-hidden="true"></i> Create Product
				</Link>
				<Link href="/categories" className="dropdown-item">
					<i className="fas fa-th-list" aria-hidden="true"></i> Categories
				</Link>
			</>
		);
	};

	const loggedRouter = () => {
		return (
			<li className="nav-item dropdown">
				<a
					className="nav-link dropdown-toggle"
					href="#"
					id="navbarDropdownMenuLink"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					<img
						src={auth.user.avatar}
						alt={auth.user.name}
						className="rounded-circle avatar-ring mr-1"
						style={{
							width: '28px',
							height: '28px',
							objectFit: 'cover',
						}}
					/>{' '}
					{auth.user.name}
				</a>

				<div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
					<Link href="/profile" className="dropdown-item">
						<i className="fas fa-user-circle" aria-hidden="true"></i> Profile
					</Link>
					{auth.user.role === 'admin' && adminRouter()}
					<div className="dropdown-divider"></div>
					<button className="dropdown-item" onClick={handleLogout}>
						<i className="fas fa-sign-out-alt" aria-hidden="true"></i> Logout
					</button>
				</div>
			</li>
		);
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light">
			<Link href="/" className="navbar-brand">
				<i className="fas fa-terminal navbar-brand-icon" aria-hidden="true"></i>
				<span>
					Dev<span className="brand-highlight">Commerce</span>
				</span>
			</Link>
			<button
				className="navbar-toggler custom-toggler collapsed"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="custom-toggler-bar bar-1"></span>
				<span className="custom-toggler-bar bar-2"></span>
				<span className="custom-toggler-bar bar-3"></span>
			</button>
			<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
				<ul className="navbar-nav p-1">
					<li className="nav-item">
						<Link href="/products" className={'nav-link' + isActive('/products')}>
							<i className="fas fa-cubes" aria-hidden="true"></i> Products
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/cart" className={'nav-link' + isActive('/cart')}>
							<div className="cart-icon-wrapper mr-1">
								<i className="fas fa-shopping-cart" aria-hidden="true"></i>
								{cart.length > 0 && (
									<span className="cart-badge pulse">
										{cart.length}
									</span>
								)}
							</div>{' '}
							Cart
						</Link>
					</li>
					{Object.keys(auth).length === 0 ? (
						<li className="nav-item">
							<Link href="/signin" className={'nav-link' + isActive('/signin')}>
								<i className="fas fa-user" aria-hidden="true"></i> Sign in
							</Link>
						</li>
					) : (
						loggedRouter()
					)}
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;
