function getWinsLosses(data) {
    let losses = 0
    data.forEach(result => !result.won && losses++)

    const wins = data.length - losses

    return { losses, wins }
}

function getWinsByFrame(data) {
    const wins = [0, 0, 0, 0, 0, 0]
    data.forEach(result => result.won && wins[result.frame_won - 1]++)

    return wins
}

function getTotalPlays({ losses, wins }) {
    return wins + losses
}

function getWinPct(wins, totalPlays) {
    return ((wins / totalPlays) * 100).toFixed(2)
}

export default function getStats(data) {
    const winsLosses = getWinsLosses(data)
    const winsByFrame = getWinsByFrame(data)
    const totalPlays = getTotalPlays(winsLosses)
    const winPct = getWinPct(winsLosses.wins, totalPlays)

    return { ...winsLosses, totalPlays, winsByFrame, winPct }
}
