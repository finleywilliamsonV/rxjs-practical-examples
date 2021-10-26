import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faLemon, faPepperHot, IconDefinition } from '@fortawesome/free-solid-svg-icons'
/**
 * Data mapping fruit icons to their colors
 */
export interface FruitData {
    icon: IconDefinition
    color: string
    scaling: number
}

const fruitDb: FruitData[] = [
    {
        icon: faApple,
        color: 'red',
        scaling: 1.25,
    },
    {
        icon: faApple,
        color: 'limegreen',
        scaling: 1.25,
    },
    {
        icon: faLemon,
        color: 'yellow',
        scaling: 0.75,
    },
    {
        icon: faLemon,
        color: 'green',
        scaling: 0.75,
    },
    {
        icon: faPepperHot,
        color: 'darkorange',
        scaling: 1,
    }
]

export const getNextFruitData = (): FruitData => {
    const randomIndex: number = Math.floor(Math.random() * fruitDb.length)
    return fruitDb[randomIndex]
}
