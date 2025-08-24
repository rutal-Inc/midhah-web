"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function TadaLottie({
    loader,
    delay = 0,
}: Readonly<{ loader: object, delay?: number }>) {
    const [show, setShow] = useState(delay === 0);

    useEffect(() => {
        if (delay > 0) {
            const timer = setTimeout(() => setShow(true), delay);
            return () => clearTimeout(timer);
        }
    }, [delay]);

    if (!show) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center opacity-100 w-screen h-screen">
            <Lottie
                animationData={loader}
                loop
                autoplay
                className="w-full h-full"
            />
        </div>
    );
}
