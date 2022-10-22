import { dragonFruitIcon, leafOneIcon, leafTwoIcon, lycheeIcon, orangeSliceIcon, orangeSliceTwoIcon } from "../constants/assets.constants"

export const getImageListByType = (tileType: number) =>{
    if (tileType === 1){
       let listImage = [leafTwoIcon,leafOneIcon,leafTwoIcon,leafOneIcon]
       return listImage
    }
    if (tileType === 2){
        let listImage = [orangeSliceIcon,orangeSliceTwoIcon,lycheeIcon,dragonFruitIcon]
        return listImage
    }
   

}