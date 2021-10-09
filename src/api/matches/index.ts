import Axios from 'axios'
import moment from 'moment'
import { MatchesMap, Match } from '../../utils/interfaces/matches'

let matchesCache: MatchesMap | null = null

export async function getMatches (): Promise<MatchesMap> {
    if (matchesCache) return matchesCache
    const response: any = await Axios.get('https://www.dontouch.ch/json/cc.json')
    const matches = (response?.data?.doc[0]?.data?.matches as MatchesMap) || []
    matchesCache = matches
    return matches
}

export function deleteMatch (matchIds: string[]) {
    if (!matchesCache) return
    matchesCache = Object.keys(matchesCache).reduce((acc: MatchesMap, matchKey) => {
        if (matchesCache && !matchIds.includes(matchKey)) acc[matchKey] = matchesCache[matchKey]
        return acc
    }, {})
}

export function addMatch() {
    if (!matchesCache) return
    const allIDS = Object.keys(matchesCache).map(el => Number(el))
    allIDS.sort()
    const newMatchID = allIDS.length > 0 ? allIDS[allIDS.length - 1] + 1 : 23639961
    const match: Match = {
        teams: {
            away: { name: 'teamY' },
            home: { name: 'teamX' }
        },
        time: {
            date: moment().format('DD/MM/YYYY'),
            time: moment().format('h:mm:ss')
        },
        result: {
            away: Math.floor(Math.random() * 5),
            home: Math.floor(Math.random() * 5),
        }
    }
    matchesCache[newMatchID] = match
}