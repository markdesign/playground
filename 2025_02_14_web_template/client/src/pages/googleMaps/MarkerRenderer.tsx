import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { cn } from 'src/utils/cn';

import { MarkerCharacter } from './MarkerCharacter';
import { MarkerCard } from './MarkerCard';

interface MarkerLocation {
    lat: number;
    lng: number;
}

interface MarkerRendererData {
    id: string;
    location: MarkerLocation;
    disabled?: boolean;
}

interface MarkerRendererProps {
    data: MarkerRendererData;
}

export const MarkerRenderer = (props: MarkerRendererProps) => {
    const { data } = props;
    const { id, location, disabled } = data;
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback(() => {
        if (!disabled) {
            setIsOpen((prev) => !prev);
        }
    }, [disabled]);

    return (
        <AdvancedMarker
            position={location}
            title={'AdvancedMarker with custom html content.'}
            className={cn('text-base')}
            clickable={true}
            onClick={handleClick}
        >
            <div
                data-type="Marker"
                className={cn(
                    'relative flex items-center justify-center',
                    disabled && 'pointer-events-none cursor-not-allowed opacity-50',
                )}
            >
                <AnimatePresence>{isOpen ? <MarkerCard /> : <MarkerCharacter />}</AnimatePresence>
            </div>
        </AdvancedMarker>
    );
};
