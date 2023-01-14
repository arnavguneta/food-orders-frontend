import classes from './Header.module.css'

import HeaderCartButton from './HeaderCartButton'

const Header = props => {
    return (
        <>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onToggleCart={props.onToggleCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={`${process.env.REACT_APP_ASSETS || ''}/images/meals.jpg`} alt="A table full of food" />
            </div>
        </>
    )
}

export default Header