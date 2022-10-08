import { memo } from "react";

function Swatch({ params, onClick }) {
    console.log(`Swatch  rendered ${params.colors}`);
    return <div onClick={onClick} style={{ margin: 2, width: 75, height: 75, backgroundColor: params.colors }}></div>;
}

const MemoedSwatch = memo(Swatch);
// const MemoedSwatch = Swatch;

export default MemoedSwatch;
