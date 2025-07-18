import React from 'react';
import useFetchUsers from '../../Hooks/useFetchUsers';
import './Testimonials.css';

function Testimonials() {
  const { data: users, loading, error } = useFetchUsers(4);
  const quotes = [
    `"Best in town!"`,
    `"Adrian and Mario make the best dishes!"`,
    `"Such a cozy atmosphere"`,
    `"Feels like home!"`
  ];

  if (loading) {
    return (
      <section className="testimonials-section">
        <h2>Loading Testimonials...</h2>
      </section>
    );
  }
  if (error) {
    return (
    <section className="testimonials-section">
      <h2>Error loading testimonials: {error.message}</h2>
    </section>
    );
  }

  const displayUsers = users && users.slice(0, quotes.length);
  return (
    <section className="testimonials-section">
      {/* <h2>Testimonials</h2> */}
      {displayUsers && displayUsers.map((user, index) => (
        <article className="testimonial-card" key={user.login.uuid}>
          <img 
          src={user.picture.medium}
          alt={`${user.name.first} ${user.name.last}`}
          className='testimonial-img'
          />
          <h3>{user.name.first} {user.name.last}</h3>
          <blockquote>{quotes[index]}</blockquote>
        </article>
      ))}
    </section>
  );
}

export default Testimonials;