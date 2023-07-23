import { gameDataStore } from "../store/gameDataStore";
import Card from "../components/Card";
import ActiveChart from "../components/Datas/ActiveChart";
import BestPartnerChart from "../components/Datas/BestPartnerChart";
import CourtChart from "../components/Datas/CourtChart";
import LoveAllInfoCard from "../components/Datas/LoveAllInfoCard";
import PlayerChart from "../components/Datas/PlayerChart";
import PlayerInfoCard from "../components/Datas/PlayerInfoCard";
import ReserveChart from "../components/Datas/ReserveChart";
import WeekChart from "../components/Datas/WeekChard";
import { SearchType, RangeEnum } from "../types";

const RenderCard = () => {
  const { range, searchTarget } = gameDataStore();
  const { targetType } = searchTarget;

  switch (targetType) {
    case SearchType.player:
      return (
        <div
          style={{
            width: "100%",
            maxWidth: 1080,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Card>
            <PlayerInfoCard />
          </Card>
          {range !== RangeEnum.일개월 && (
            <Card>
              <ActiveChart />
            </Card>
          )}
          <Card>
            <CourtChart />
          </Card>
          <Card>
            <BestPartnerChart />
          </Card>
          <Card>
            <WeekChart />
          </Card>
        </div>
      );
    case SearchType.court:
      return (
        <div
          style={{
            width: "100%",
            maxWidth: 1080,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Card>
            <PlayerInfoCard />
          </Card>
          {range !== RangeEnum.일개월 && (
            <Card>
              <ActiveChart />
            </Card>
          )}
          <Card>
            <CourtChart />
          </Card>
          <Card>
            <BestPartnerChart />
          </Card>
          <Card>
            <WeekChart />
          </Card>
        </div>
      );
    default:
      return (
        <div
          style={{
            width: "100%",
            maxWidth: 1080,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Card>
            <LoveAllInfoCard />
          </Card>
          {range !== RangeEnum.일개월 && (
            <Card>
              <ActiveChart />
            </Card>
          )}
          <Card>
            <PlayerChart />
          </Card>
          <Card>
            <CourtChart />
          </Card>
          <Card>
            <ReserveChart />
          </Card>
          <Card>
            <WeekChart />
          </Card>
        </div>
      );
  }
};

export default RenderCard;
