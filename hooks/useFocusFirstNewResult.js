import { useRef, useEffect, useState } from 'react';

/**
 * The `useFocusFirstNewResult` hook provides the ability to set the focus
 * on the first new post result in order to improve accessibility.
 *
 * @param {array} posts An array of posts.
 * @returns {{firstNewResultRef: HTMLDivElement, firstNewResultIndex: number}} Result object
 */
export default function useFocusFirstNewResult(posts) {
  const firstNewResultRef = useRef();
  const previousPostsLengthRef = useRef(posts?.length ?? 0);
  const [firstNewResultIndex, setFirstnewResultIndex] = useState(0);

  useEffect(() => {
    const currentPostsLength = posts?.length ?? 0;
    const previousPostsLength = previousPostsLengthRef.current;
    const hasAppendedResults = currentPostsLength > previousPostsLength;

    if (hasAppendedResults) {
      setFirstnewResultIndex(previousPostsLength);
      firstNewResultRef.current?.focus();
    }

    previousPostsLengthRef.current = currentPostsLength;
  }, [posts]);

  return { firstNewResultRef, firstNewResultIndex };
}
