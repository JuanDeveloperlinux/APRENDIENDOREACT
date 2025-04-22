import './App.css'
import {useState} from 'react'


export function TwitterFollowCard({children,userName='unknown',initialIsFollowing}) {
    const [isfollowing,setIsFollowing] = useState(initialIsFollowing);

   const text = isfollowing ? 'Siguiendo' : 'Seguir';

    const handleClick = () => {
        setIsFollowing(!isfollowing);
    }

   const buttonClassName =
       isfollowing ?
           'tw-followCard-button is-following' :
           'tw-followCard-button';

    return (
        <article className="tw-followCard">
            <header className="tw-followCard-header">
                <img className="tw-followCard-avatar" src={`https://unavatar.io/${userName}`} alt={`imagen de ${name}`} />
                <div className="tw-followCard-info">
                    <strong>{children}</strong>
                    <span className="tw-followCard-infoUserName">@{userName}</span>
                </div>
            </header>

            <aside>
                <button onClick={handleClick} className={buttonClassName}>
                    <span className={'tw-followCard-text'}>{text}</span>
                    <span className={'tw-followCard-stopFollow'}>Dejar de seguir</span>
                </button>
            </aside>
        </article>

    )
}