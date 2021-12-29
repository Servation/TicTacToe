const gameBoard = (() => {
    let _board =
        [['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3']];
    const winningPos =
        [['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3'],
        ['a1', 'b2', 'c3'],
        ['a3', 'b2', 'c1']];

    const getBoard = () => {
        return _board;
    }
    return { getBoard };
})();

const displayController = (() => {

})();

const player = () => {
    let currentPos = [];
    const setPos = (pos) => {
        currentPos.push(pos);
    };
    const getPos = () => currentPos;
    const resetPos = () => {
        currentPos = [];
    };
    return { setPos, getPos, resetPos };
}

const playerOne = player();
const playerTwo = player();