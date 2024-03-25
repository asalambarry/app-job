/* eslint-disable no-unused-vars */
// import React from 'react'
// import Navabar from './composants/Navabar'
// import Hero from './composants/Hero'
// import HomeCards from './composants/HomeCards'
// import JobListings from './composants/JobListings'
// import ViewAllJobs from './composants/ViewAllJobs'
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './Pages/HomePage'
import JobsPage from './Pages/JobsPage';
import NotFoundPage from './Pages/NotFound';
import AddJobPage from './Pages/AddJobPage';
import JobPage, { jobLoader } from './Pages/JobPage';
import EditJobPage from './Pages/EditJobPage';

const App = () => {

	const addJob = async (newJob) => {
		const res = await fetch('http://localhost:8000/jobs', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newJob),
		});
		if (!res.ok) {
			// Gestion des erreurs, par exemple affichage d'un message à l'utilisateur
			console.error('Erreur lors de l\'ajout du job');
		} else {
			const data = await res.json(); // Supposons que le serveur renvoie du JSON
			console.log(data); // Affiche la réponse du serveur pour débogage
		}
	};

	const deleteJob = async (id) => {
		const res = await fetch(`http://localhost:8000/jobs/${id}`, {
			method: 'DELETE',
		});
		if (!res.ok) {
			// Gestion des erreurs, par exemple affichage d'un message à l'utilisateur	
			console.error('Erreur lors de la suppression du job');
		} else {
			console.log('Job supprimé');
		}
	}

	const updateJob = async (job) => {
		const res = await fetch(`http://localhost:8000/jobs/${job.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(job),
		});
		return;
	};



	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/jobs" element={<JobsPage />} />
				<Route path="/job/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
				<Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
				<Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};


export default App