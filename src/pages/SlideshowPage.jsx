import { useEffect, useMemo, useState } from "react";

const SLIDE_INTERVAL_MS = 5000;
const IMAGE_API_URL = "https://api.thecatapi.com/v1/images/search?limit=10";

export default function SlideshowPage() {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const lastIndex = useMemo(() => Math.max(0, images.length - 1), [images.length]);

    useEffect(() => {
        let cancelled = false;

        async function loadImages() {
            setIsLoading(true);
            setErrorMessage("");

            try {
                const response = await fetch(IMAGE_API_URL);
                if (!response.ok) {
                    throw new Error(`Image API request failed (${response.status})`);
                }

                const data = await response.json();
                const urls = Array.isArray(data)
                    ? data
                        .map((item) => (typeof item?.url === "string" ? item.url : null))
                        .filter(Boolean)
                    : [];

                if (!urls.length) {
                    throw new Error("No images were returned by the API.");
                }

                if (!cancelled) {
                    setImages(urls);
                    setCurrentIndex(0);
                }
            } catch (error) {
                if (!cancelled) {
                    setErrorMessage(error instanceof Error ? error.message : "Failed to load slideshow images.");
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        loadImages();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!isPlaying || images.length < 2) {
            return undefined;
        }

        const timer = window.setInterval(() => {
            setCurrentIndex((previousIndex) => {
                if (previousIndex >= lastIndex) {
                    setIsPlaying(false);
                    return previousIndex;
                }
                return previousIndex + 1;
            });
        }, SLIDE_INTERVAL_MS);

        return () => {
            window.clearInterval(timer);
        };
    }, [isPlaying, images.length, lastIndex]);

    const canMoveBackward = currentIndex > 0;
    const canMoveForward = currentIndex < lastIndex;
    const hasImages = images.length > 0;
    const currentImageUrl = hasImages ? images[currentIndex] : "";

    function onFirst() {
        setCurrentIndex(0);
    }

    function onPrevious() {
        setCurrentIndex((index) => Math.max(0, index - 1));
    }

    function onNext() {
        setCurrentIndex((index) => Math.min(lastIndex, index + 1));
    }

    function onEnd() {
        setCurrentIndex(lastIndex);
    }

    function onPlay() {
        if (!hasImages || !canMoveForward) {
            setCurrentIndex(0);
        }
        setIsPlaying(true);
    }

    function onStop() {
        setIsPlaying(false);
    }

    return (
        <main>
            <h2>API Slideshow</h2>
            <p>Images are loaded from The Cat API and auto-advance every 5 seconds while playing.</p>

            {isLoading && <p>Loading slideshow images...</p>}
            {!isLoading && errorMessage && <p>{errorMessage}</p>}

            {!isLoading && !errorMessage && hasImages && (
                <section className="slideshow-panel" aria-live="polite">
                    <p className="slideshow-status">
                        Slide {currentIndex + 1} of {images.length} {isPlaying ? "(Playing)" : "(Stopped)"}
                    </p>

                    <figure className="slideshow-figure">
                        <img src={currentImageUrl} alt={`Cat slide ${currentIndex + 1}`} />
                    </figure>

                    <div className="slideshow-controls">
                        <button type="button" onClick={onFirst} disabled={!canMoveBackward}>
                            First
                        </button>
                        <button type="button" onClick={onPrevious} disabled={!canMoveBackward}>
                            Previous
                        </button>
                        <button type="button" onClick={onNext} disabled={!canMoveForward}>
                            Next
                        </button>
                        <button type="button" onClick={onEnd} disabled={!canMoveForward}>
                            End
                        </button>
                        <button type="button" onClick={onPlay} disabled={isPlaying || images.length < 2}>
                            Play
                        </button>
                        <button type="button" onClick={onStop} disabled={!isPlaying}>
                            Stop
                        </button>
                    </div>
                </section>
            )}
        </main>
    );
}
