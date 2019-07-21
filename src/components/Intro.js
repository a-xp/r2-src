import React, {useContext} from 'react';
import {BlockTitle, Card, CardContent, CardFooter, CardHeader} from "framework7-react";

export function Intro(props) {
    return (
        <>
            <Card>
                <CardHeader style={{ backgroundImage: 'url(static/bg1.jpg)', backgroundPosition: 'center',
                    minHeight: 450, backgroundSize: 'cover'}}>
                </CardHeader>
                <CardContent>
                    <p>The Empire must fall. Our mission must succeed. By destroying their key bases, we will shatter Imperial strength and liberate our people. Yet spies have infiltrated our ranks, ready for sabotage. We must unmask them. In five nights we reshape destiny or die trying. We are the Resistance!</p>
                </CardContent>
                <CardFooter>
                    <p>Waiting to start...</p>
                </CardFooter>
            </Card>
        </>
    )
}