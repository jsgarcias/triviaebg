import React from 'react'
import styled, { keyframes } from 'styled-components'
import StarIcon from '@material-ui/icons/Star'
import WinStar from '../../assets/svg/win-star.svg'


const shootOut = (left, top, opacity) => keyframes`
    0% {
        transform: translate3d(0, 0, 0);
        opacity: ${opacity};
    }

    60%{
         opacity: ${opacity};
    }

    100%{
        transform: translate3d(${left}px, ${top}px, 0);
        opacity: 0;
    }
`;

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50;
    top: 0;
    ${props => props.win ? 'left:35%; top: 35%' : 'left: 50;top: 0;'}

    transform: translate(-34.5%, -34.5%);

    ${props => !props.isMobile && `
        width: 300px;
        height: 300px;
    `}
m`;

const Star = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
   
    svg{
        color: ${props => props.color};
        font-size: ${props => props.size}px;
        animation: ${props => shootOut(props.left, props.top, props.opacity)} ${props => props.duration}s ease-out infinite;
        opacity: ${props => props.opacity};
    }
`;

class AnimatedStars extends React.Component {
    state = {
        stars: [],
        shown: false
    }

    componentDidMount() {
        const stars = [];
        for (let i = 0; i < 15; i++) {
            const minDistance = !this.props.win ? -120 : -120;
            const maxDistance = !this.props.win ? 120 : 120;
            const minDuration = 0.5;
            const maxDuration = 2;
            const color = Math.random() < 0.5 ? 'white' : this.props.barColor;
            stars[i] = {
                size: Math.floor(Math.random() * 24 + 8),
                left: Math.floor(Math.random() * (maxDistance - minDistance) + minDistance),
                top: Math.floor(Math.random() * (maxDistance - minDistance) + minDistance),
                duration: Math.random() * (maxDuration - minDuration) + minDuration,
                opacity: Math.random() * 0.5 + 0.5,
                color: color
            }
        }

        this.setState({ stars })
    }

    componentWillReceiveProps(props) {
        if(props.shown) {
            setTimeout(() => {this.setState({shown: false})}, 2000);
        }
    }

    render() {
        return (
            <Container
                isMobile={this.props.isMobile}
                win={this.props.win}
            >
                {
                    this.state.stars.map((star, i) => {
                        return (
                            <Star
                                key={i}
                                size={star.size}
                                left={star.left}
                                top={star.top}
                                duration={star.duration}
                                opacity={star.opacity}
                                color={star.color}
                            >
                                {this.props.win ? <WinStar /> : <StarIcon />}
                            </Star>
                        )
                    })
                }
            </Container>
        )
    }
}


export default AnimatedStars;