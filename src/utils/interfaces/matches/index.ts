export interface MatchesMap {
    [matchId: string]: Match
}

export interface Match {
    teams: MatchTeams
    time: MatchTime
    result: MatchResult
}

export interface MatchTeams {
    away: { name: string }
    home: { name: string }
}

export interface MatchTime {
    date: string
    time: string
}

export interface MatchResult {
    away: number
    home: number
}

export interface MatchTableRow {
    id: string
    teams: string
    date: string
    time: string
    result: string
}