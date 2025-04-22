import './App.css'
import {TwitterFollowCard} from "./TwitterFollowCard.jsx";

const users= [
    {
        userName: 'sanbenito',
        name: 'benito antonio',
        initialIsFollowing: true,
    },
    {
        userName: 'midudev',
        name: 'midu',
        initialIsFollowing: false,
    },
    {
        userName: 'unknown',
        name: 'unknown',
        initialIsFollowing: true,
    }
]

export function App() {
    return (
        <>
            <section className="App">
                {
                    users.map(({userName,name,initialIsFollowing} ) =>
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={initialIsFollowing}>
                            {name}
                        </TwitterFollowCard>
                    )
                }

            </section>
        </>
    )
}