import React from 'react';
import IntroCard from './introCard';
const Intro = () => {
    const introCards = [
        {
            name: "Characters",
            picUrl: "https://variety.com/wp-content/uploads/2018/11/disney-star-wars-animated-shorts.jpg",
            introText: "Discover the story of the legendary characters and explore their journey through the galaxy."
        },
        {
            name: "Planets",
            picUrl: "https://reviewsyouread.files.wordpress.com/2021/03/10-more-star-wars-planets-as-countries.png",
            introText: "Learn about the diverse worlds that populate the Star Wars galaxy."
        },
        {
            name: "Starships",
            picUrl: "https://c4.wallpaperflare.com/wallpaper/505/80/981/star-wars-ship-wallpaper-preview.jpg",
            introText: "Explore starships and their advanced technology, formidable weaponry, and incredible speed."
        },
    ]
    return (
        <div className="row">
            {
                introCards.map(item => {
                    return <IntroCard name={item.name} picUrl={item.picUrl} introText={item.introText} />
                })
            }
        </div>
    );
}

export default Intro;
