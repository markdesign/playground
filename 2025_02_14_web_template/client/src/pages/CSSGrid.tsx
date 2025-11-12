import { cn } from 'src/utils/cn';

const CSSGrid = () => {
    const optional: {
        rowsAndColumn?: React.ReactNode;
        minMax?: React.ReactNode;
        minMax2?: React.ReactNode;
        responsive?: React.ReactNode;
        responsive2?: React.ReactNode;
    } = {};

    // const baseBoxStyle = 'bg-gray-200 p-4 border-dashed border-2';

    // optional.rowsAndColumn = (
    //     <div className="grid h-full grid-cols-[100px_200px_1fr] grid-rows-3 gap-4 border-4">
    //         <div className={`${baseBoxStyle}`}>item 1</div>
    //         <div className={`${baseBoxStyle}`}>item 2</div>
    //         <div className={`${baseBoxStyle}`}>item 3</div>
    //         <div className={`${baseBoxStyle}`}>item 4</div>
    //         <div className={`${baseBoxStyle}`}>item 5</div>
    //         <div className={`${baseBoxStyle}`}>item 6</div>
    //     </div>
    // );

    // optional.minMax = (
    //     <div className="grid h-full grid-cols-12 grid-rows-[100px_1fr_100px] border-4">
    //         <div className={`${baseBoxStyle} col-span-full`}>header</div>
    //         <div className={`${baseBoxStyle} col-span-9`}>messages</div>
    //         <div className={`${baseBoxStyle} col-span-3`}>visual</div>
    //         <div className={`${baseBoxStyle} col-span-full`}>footer</div>
    //     </div>
    // );

    // optional.minMax2 = (
    //     <div
    //         data-type="Game"
    //         className={cn('m-auto grid h-full w-full place-items-center bg-neutral-900 font-sans text-gray-300')}
    //     >
    //         <div className="aspect-16/9 max-h-dvh w-full max-w-[1536px] max-xl:hidden">
    //             <div className="grid h-full grid-rows-[40px_1fr_90px] bg-neutral-800">
    //                 <div
    //                     data-type="header"
    //                     className="flex items-center justify-between border-2 border-gray-800 bg-neutral-700 px-4"
    //                 >
    //                     <div>
    //                         <span>12.16.2024</span> <span>16:05:27</span> <span>M-No: 38201</span>
    //                     </div>
    //                     <div>Terminal secure •</div>
    //                 </div>

    //                 <main data-type="AppMain" className={cn('overflow-hidden')}>
    //                     <div className="grid h-full grid-cols-12 overflow-hidden">
    //                         <div className="col-span-7 m-4 bg-stone-900 p-4">messages</div>
    //                         <div className="col-span-5 flex h-full items-center justify-center overflow-hidden bg-black">
    //                             <img
    //                                 src="https://picsum.photos/400/500"
    //                                 alt="placeholder"
    //                                 className="h-full w-full object-contain"
    //                             />
    //                         </div>
    //                     </div>
    //                 </main>
    //                 <div
    //                     data-type="NavChatBar"
    //                     className={cn('flex items-center justify-between border-2 border-gray-800 bg-neutral-700 px-4')}
    //                 >
    //                     <p>NavChatBar Component</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );

    // optional.responsive = (
    //     <div
    //         data-type="Game"
    //         className={cn('m-auto grid h-full w-full place-items-center bg-neutral-900 font-sans text-gray-300')}
    //     >
    //         <div className="max-h-dvh w-full max-w-[1536px]" style={{ aspectRatio: '16/9' }}>
    //             <div className="grid h-full grid-rows-[40px_1fr_90px] bg-neutral-800">
    //                 <div
    //                     data-type="header"
    //                     className="flex items-center justify-between border-2 border-gray-800 bg-neutral-700"
    //                 >
    //                     header
    //                 </div>

    //                 <main data-type="AppMain" className="flex h-full overflow-hidden">
    //                     {/* Left Column: Always at least 900px wide */}
    //                     <div className="min-w-[900px] flex-grow bg-stone-900">
    //                         <p>Consectetur adipiscing elit. Sed elementum magna vitae metus dictum.</p>
    //                         <p>
    //                             Efficitur ac nulla vitae, vehicula auctor lectus. Orci varius natoque penatibus et
    //                             magnis dis parturient montes. Efficitur ac nulla vitae, vehicula auctor lectus. Orci
    //                             varius natoque penatibus et magnis dis parturient montes.
    //                         </p>
    //                     </div>

    //                     <div className="flex h-full min-w-0 flex-shrink-0 items-center justify-end border-2">
    //                         <div className="relative flex h-full min-w-0 flex-shrink-0 items-center justify-end bg-neutral-950">
    //                             <img
    //                                 src="http://fpoimg.com/500x600"
    //                                 // src="https://fpoimg.com/1000/700"
    //                                 // src="https://fpoimg.com/700/1000"
    //                                 alt="placeholder"
    //                                 className="max-h-full max-w-full object-contain"
    //                             />
    //                         </div>
    //                     </div>
    //                 </main>

    //                 <div
    //                     data-type="NavChatBar"
    //                     className={cn('flex items-center justify-between border-2 border-gray-800 bg-neutral-700')}
    //                 >
    //                     footer
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );

    const longText =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum magna vitae metus dictum, vel vehicula odio pulvinar. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque quam justo, efficitur ac nulla vitae, vehicula auctor lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque at egestas ligula. Phasellus vestibulum fringilla justo, sit amet rhoncus lorem aliquet in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum euismod rutrum faucibus.';

    // const asset = 'https://picsum.photos/1000/1200';
    const asset = 'https://picsum.photos/600/800';
    // const asset = 'https://picsum.photos/300/800';
    // const asset = 'https://picsum.photos/100/200';
    // const asset = 'https://picsum.photos/200/150';

    // 1536 / 864

    optional.responsive2 = (
        <div data-type="Game" className={cn('m-auto grid h-full place-items-center px-4 font-mono text-gray-300')}>
            <div className="relative flex h-full max-h-[864px] w-full max-w-[1536px] flex-col border-4 border-blue-400 bg-black">
                {/* header */}
                <div data-type="AppHeader" className={cn('h-20 flex-shrink-0 bg-neutral-950')}>
                    <p>header</p>
                </div>
                {/* main */}
                <main data-type="AppMain" className={cn('flex min-h-0 flex-1')}>
                    <div className="min-w-[50%] flex-1">
                        <div data-type="MainMessages" className={cn('relative h-full bg-neutral-900')}>
                            <div className="flex h-full flex-col gap-4 overflow-x-auto pt-4 pr-10 pb-4 pl-3">
                                <p>{longText}</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-full border-2 border-blue-500">
                        <div className="h-full w-auto bg-red-500">
                            <img src={asset} alt="fpo" className="h-full object-contain max-h-[calc(100dvh-160px)] " />
                        </div>
                    </div>
                </main>
                {/* footer */}
                <div data-type="AppFooter" className={cn('h-20 flex-shrink-0 bg-neutral-950')}>
                    <p>footer</p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* {optional.rowsAndColumn} */}
            {/* {optional.responsive} */}
            {optional.responsive2}
        </>
    );
};

export { CSSGrid };
