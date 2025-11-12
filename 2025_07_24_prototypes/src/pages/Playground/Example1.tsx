
/*
viewPort
*/
export default function Example1() {

    return (
        <div>
            <svg width="100" height="100" viewBox="0 0 200 200" className="bg-neutral-500">
                <circle cx="100" cy="100" r="50" fill="black"/>
            </svg>

            <svg width="300" height="300" viewBox="0 0 200 200" className="bg-neutral-600">
                <circle cx="100" cy="100" r="50" fill="black"/>
            </svg>

            <svg width="200" height="200" viewBox="-100 -100 200 200" className="bg-neutral-700">
                <circle cx="0" cy="0" r="50" fill="black"/>
            </svg>
        </div>
    );
}
