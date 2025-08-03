// components/PageContent.js
import { useEffect } from 'react';
import { CountUp } from 'countup.js';

export default function PageContent({ html }) {
  useEffect(() => {
    const els = document.querySelectorAll('.countup');
    els.forEach((el) => {
      const value = parseFloat(el.textContent.replace(/,/g, ''));
      const countUp = new CountUp(el, value);
      if (!countUp.error) countUp.start();
    });
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
