function getWinsLosses(data) {
    let losses = 0
    data.forEach(result => !result.won && losses++)

    const wins = data.length - losses

    return { losses, wins }
}

function getWinsByFrame(data) {
    const wins = [
        { label: 1, value: 0 },
        { label: 2, value: 0 },
        { label: 3, value: 0 },
        { label: 4, value: 0 },
        { label: 5, value: 0 },
        { label: 6, value: 0 },
    ]
    data.forEach(result => result.won && wins[result.frame_won - 1].value++)

    return wins
}

function getTotalPlays({ losses, wins }) {
    return wins + losses
}

function getWinPct(wins, totalPlays) {
    if (wins === 0 && totalPlays === 0) {
        return '0'
    }

    return ((wins / totalPlays) * 100).toFixed(2)
}

function sortGames(a, b) {
    if (a.label < b.label) {
        return -1
    }

    if (a.label > b.label) {
        return 1
    }

    return 0
}

function getGamesPlayed(data) {
    let games = []

    data.forEach(game => {
        const { puzzle_id } = game

        if (games.some(ga => ga.label === puzzle_id)) {
            const index = games.findIndex(ga => ga.label === puzzle_id)
            games[index].value++
        } else {
            games.push({
                label: puzzle_id,
                value: 1,
            })
        }
    })

    return games.sort(sortGames)
}

export default function getStats(data) {
    const winsLosses = getWinsLosses(data)
    const winsByFrame = getWinsByFrame(data)
    const totalPlays = getTotalPlays(winsLosses)
    const winPct = getWinPct(winsLosses.wins, totalPlays)
    const gamesPlayed = getGamesPlayed(data)

    return { ...winsLosses, gamesPlayed, totalPlays, winsByFrame, winPct }
}
