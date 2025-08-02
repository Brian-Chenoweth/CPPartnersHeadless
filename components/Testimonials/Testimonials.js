import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';

import className from 'classnames/bind';
import TestimonialItem from '../TestimonialItem';

import styles from './Testimonials.module.scss';
const cx = className.bind(styles);

export default function Testimonials({ testimonials }) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!testimonials || testimonials.length < 2) return;

    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    setSelected(shuffled.slice(0, 2));
  }, [testimonials]);

  if (selected.length < 2) return null;

  return (
    <div className={cx('container')}>
      <div className={cx('testimonials-grid')}>
        {selected.map((testimonial, index) => (
          <TestimonialItem
            key={index}
            author={testimonial?.testimonialFields?.testimonialAuthor}
            image={testimonial?.featuredImage?.node}
            company={testimonial?.testimonialFields?.company}
            jobTitle={testimonial?.testimonialFields?.jobTitle}
          >
            <div
              className={cx('slide-content')}
              dangerouslySetInnerHTML={{
                __html: testimonial?.testimonialFields?.testimonialContent,
              }}
            />
          </TestimonialItem>
        ))}
      </div>
    </div>
  );
}

Testimonials.fragments = {
  entry: gql`
    fragment TestimonialsFragment on Testimonial {
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      testimonialFields {
        testimonialContent
        testimonialAuthor
        company
        jobTitle
      }
    }
  `,
};
