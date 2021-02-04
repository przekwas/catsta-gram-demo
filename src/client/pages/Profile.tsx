import * as React from 'react';

const Profile = (props: ProfileProps) => {
	return (
		<main className="container">
			<section className="row mt-3">
				<div className="col-md-12">
					<h1>Profile View</h1>
				</div>
			</section>
		</main>
	);
};

interface ProfileProps {}

export default Profile;