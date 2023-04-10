import React from "react";

import fishdata from "../fishdata.js";
import "./FishMenu.css"

function FishInfo(props) {
    const { fish } = props;

    const locationText = (value) => {
        switch (value) {
            case "Ginger Ocean":
                return "Ginger Island Oceans";
            case "Town":
                return "River (Town)";
            case "Forest":
                return "River (Forest)";
            case "Lake":
                return "Mountain Lake";
            case "Pond":
                return "Cindersap Forest Pond";
            case "Woods":
                return "Secret Woods Ponds";
            case "Sewers":
                return "The Sewers";
            case "Swamp":
                return "Witch's Swamp";
            case "Market":
                return "Night Market";
            case "Volcano":
                return "Volcano Caldera";
            case "Desert":
                return "The Desert";
            case "Ginger Pond":
                return "Ginger Island Pond";
            case "Ginger River":
                return "Ginger Island River";
            case "Bug":
                return "Mutant Bug Lair";
            case "Cove":
                return "Pirate Cove";
            default:
                return value;
        }
    }

    const timeText = (timeArr) => {
        const numToTimeStr = (num) => {
            if (num < 12) {
                return `${num} AM`;
            } else if (num < 24) {
                return `${num % 12} PM`;
            } else {
                return `${num % 24} AM`;
            }
        }
        if (timeArr[0] == 6 && timeArr[1] == 26) {
            return ["Any"];
        } else {
            let pairArr = Array.from({ length: timeArr.length / 2 }, (_, i) => `${numToTimeStr(timeArr[i * 2])} - ${numToTimeStr(timeArr[i * 2 + 1])}`);
            return pairArr;
        }
    }

    return (
        <div className="fishInfo">
            <div>
                <p className="infoHeader">Seasons</p>
                {fish.season.map(value => <p>{value}</p>)}
            </div>
            <div>
                <p className="infoHeader">Weather</p>
                {fish.weather.map(value => <p>{value}</p>)}
            </div>
            <div>
                <p className="infoHeader">Locations</p>
                {fish.location.map(value => <p>{locationText(value)}</p>)}
            </div>
            <div>
                <p className="infoHeader">Time</p>
                {timeText(fish.time).map(value => <p>{value}</p>)}
            </div>
        </div>
    )
}

function FishImg(props) {
    const { fish, selected, onClick } = props;

    const [hover, setHover] = React.useState(false);

    return (
        <div 
            onClick={onClick} 
            onMouseEnter={()=>{setHover(true)}} 
            onMouseLeave={()=>{setHover(false)}} 
            className={"fishContainer"}
        >
            <div className="shadow" style={{maskImage: `url(${fish.src})`, transform: `scale(${hover ? 1.2 : 1})`}}></div>
            {selected && <div className="selected" style={{maskImage: `url(${fish.src})`}}></div>}
            <img src={fish.src} alt={fish.name} className="fish_icon" style={{transform: `scale(${hover ? 1.2 : 1})`}}></img>
            {hover && <FishInfo fish={fish}/>}
        </div>
    )
}

export default function FishMenu(props) {
    const { onGuess } = props;

    let fishArray = fishdata.fish;
    
    fishArray = fishArray.map((fish, index) => ({
        ...fish,
        src: `/fish_sprites/fish_sprite_${index+1}.png`
    }))

    const [fishChoice, setFishChoice] = React.useState(fishArray);
    const [selectedFish, setSelectedFish] = React.useState(fishChoice[0]);
    const [formData, setFormData] = React.useState("");

    const inputRef = React.useRef(null);
    
    const handleFishChange = (event) => {
        setFormData(event.target.value);
        const validFish = fishArray.filter((fish) => (fish.name.toLowerCase().includes(event.target.value.toLowerCase())))
        setFishChoice(_ => {
            return validFish;
        });
        setSelectedFish(validFish[0]);
    }
    
    const onFishClick = (fish) => {
        setFormData(fish.name);
        setSelectedFish(fish);
        inputRef.current.focus();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormData("");
        setFishChoice(fishArray);
        setSelectedFish(fishArray[0]);
        onGuess(selectedFish);
    }
    
    return (
        <div className="menu">
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="fish"
                    onChange={handleFishChange}
                    name="fish"
                    value={formData}
                />
                <button>Submit</button>
            </form>
            <div className="fish_container">
                {fishChoice.map(value => {return <FishImg 
                    key={value.name}
                    fish={value}
                    onClick = {() => {onFishClick(value)}}
                    selected = {value.name == selectedFish.name}
                />})

                }
                {/* {fishChoice.map(value => {return <img 
                    key={value.name} 
                    className="fish_icon" 
                    alt={value.name} 
                    src={value.src} 
                    onClick={() => {onFishClick(value)}}
                    style={value.name == selectedFish.name ? {filter: "drop-shadow(3px 3px 0px rgb(50, 200, 50)"}: {}}/>})} */}
            </div>
        </div>
    )
}