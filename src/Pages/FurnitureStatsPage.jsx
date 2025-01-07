import { useLocation } from "react-router-dom"
function FurnitureStatsPage() {
    const location = useLocation();
    const furniture = location.state?.fid;
    console.log(furniture);
  return (
    <div>FurnitureStatsPage</div>
  )
}

export default FurnitureStatsPage