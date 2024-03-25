import Hero from '../composants/Hero';
import HomeCards from '../composants/HomeCards';
import JobListings from '../composants/JobListings';
import ViewAllJobs from '../composants/ViewAllJobs';

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeCards />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};
export default HomePage;