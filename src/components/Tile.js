import React, { PropTypes } from "react"
import Radium from "radium"
import ReactDOM from "react-dom"
import Hammer from "react-hammerjs"

import svgSymbols from "../assets/svg"




const Tile = Radium( prop => {
            
        let { 
            
            tile, 
            
            tileMeasurements, 
            
            symbolName, 
            
            positions, 
            
            canMove, 
            
            panEnd,
            
            animationEnd
            
        } = prop
        
        let { 
            
            tileWidth, 
            
            tileHeight, 
            
            tileBleeding, 
            
            tileMargin
            
        } = tileMeasurements
        
        let translateX = positions[tile.position][1] * 
            (tileWidth + tileBleeding)
            
        let translateY = positions[tile.position][0] *
            (tileHeight + tileBleeding)
            
        let tileStyle = {
            
            margin: tileMargin,
            
            width: tileWidth,
            
            height: tileHeight,
            
            lineHeight: tileHeight + "px",
            
            fontSize: tileHeight,
            
            textAlign: "center",
            
            position: "absolute",
            
            transform: `translate(${translateX}px, ${translateY}px) scale(1)`,
            
            transitionProperty: "transform",
            
            transitionDuration: "500ms",
            
            transitionTimingFunction: "ease"
            
        }
        
        let contentStyle = {

            base: {
            
                position: "absolute",
                
                width: "80%",
                
                height: "80%",
                
                left: 0,
                
                right: 0,
                
                margin: "10%",
                
            },
            
            selected: {
                
                background: "#e5e5e5",
                
                borderRadius: "13%",
                
                boxShadow: "0px 0px 1vh 0 rgba(66,65,66,.5)"
                
            },
            
            marked: {
                
                borderRadius: "13%",
                
                opacity: 0,
                
                animation: "x 1s ease-in 0s 1" ,
                
                animationName: tile.willMark? markKeyframes : "none",
                
                backgroundColor: "#66CC99",
                
            },
            
            symbol : {
                
                width: "60%",
                
                height: "60%",
                
                margin: "20%",
                
                backgroundRepeat: "no-repeat",
                
            }
            
        }
        
        let svgStyle = {

            position: "absolute",
            
            left: "0px",
            
            top: "0px",

        }
        


        
        if (tile.removed) {
            
            tileStyle.transform = `translate(${translateX}px, ${translateY}px) scale(0)`

        }
        

        return (
            <Hammer vertical={true} onPanEnd={
                (ev) => {
                    if(ev.additionalEvent && canMove) {
                        panEnd(ev.additionalEvent)
                    }

                }
            }>
                <span 
                    style={tileStyle} 
                >
                    <span
                        style={[contentStyle.base, contentStyle.selected]}
                    > </span>
                    <span
                        style={[contentStyle.base, contentStyle.marked]}
                        onAnimationEnd={animationEnd}
                    / >
                    <span
                        style={[contentStyle.base, contentStyle.symbol]}
                    >
                        <svg style={svgStyle} viewBox={svgSymbols[symbolName]["viewBox"]}>
                            <path d={svgSymbols[symbolName]["paths"][0]} />
                        </svg>
                    </span>


                </span>
            </Hammer>
    
        )

    }
)

let markKeyframes = Radium.keyframes({
    '0%': {
        opacity: '0'
    },
    '50%': {
        opacity: '1'
    },
    '100%': {
        opacity: '0'
    },
})



Tile.PropTypes = {
    
    tile: PropTypes.object.isRequired,
    
    onClick: PropTypes.func.isRequired,
    
    isActive: React.PropTypes.bool.isRequired,
    
    tileMeasurements: PropTypes.object.isRequired,
    
    symbolName: PropTypes.string.isRequired, 
    
    positions: PropTypes.array.isRequired,
    
}

export default Tile