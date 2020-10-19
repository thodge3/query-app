import React from "react";
import styles from "./SecondComponent.module.css";

const SecondComponent = () => {
    let variable = "SecondComponent";

    return (
        <div className={`container my-2`}>
            <div className={`row mx-3 justify-content-around`}>
                <h1 className={styles.h1}>This is SecondComponent</h1>
                <h1>Hello {variable} 1</h1>
            </div>
        </div>
    )
}

export default SecondComponent;