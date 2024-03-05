import { View, Text } from 'react-native'
import React from 'react'
import StepIndicator from 'react-native-step-indicator';

const StepComponent = ({ current = 0, items = [''] }) => {
    return (
        <StepIndicator
            stepCount={3}
            currentPosition={current}
            labels={items}
        />
    )
}

export default StepComponent