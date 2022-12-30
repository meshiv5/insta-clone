import { useEffect, useState } from "react";
export default function useMedia(query) {
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches) {
      setIsMatched(true);
    } else {
      setIsMatched(false);
    }

    function handleMatchChange() {
      setIsMatched(media.matches);
    }

    media.addListener(handleMatchChange);

    return () => media.removeListener(handleMatchChange);
  }, [query]);

  return isMatched;
}
