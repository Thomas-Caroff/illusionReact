/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import StatisticsCard from "examples/Cards/StatisticsCards/BaseStatsCards";
import SkillsCard from "examples/Cards/StatisticsCards/SkillsCards";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import { useEffect, useState } from "react";
import { API_URL } from "constants";
import CharaHeaderCard from "examples/Cards/StatisticsCards/CharaHeaderCards";

function Stats() {
  let [character, setCharacter] = useState([]);
  let [caracterisctics, setCaracterisctics] = useState([]);
  let [skills, setSkills] = useState([]);
  let [charaHeader, setCharaHeader] = useState([]);
  const { sales, tasks } = reportsLineChartData;

  const hardcoded_character = "tscxxg28";
  const hardcoded_skillset = "clmmag9q";

  useEffect(() => {
    fetch(API_URL + "character/" + hardcoded_character)
      .then((response) => response.json())
      .then((json) => {
        fetch(API_URL + "characterstats/" + json[0].character_stats)
          .then((response) => response.json())
          .then((stats) => {
            const caracterisctics = {
              id: stats[0].id,

              // DnD/PF/FF
              strength: stats[0].strength,
              dexterity: stats[0].dexterity,
              constitution: stats[0].constitution,
              intelligence: stats[0].intelligence,
              wisdom: stats[0].wisdom,
              charisma: stats[0].charisma,

              // Modifiers
              strength_mod: stats[0].str_mod,
              dexterity_mod: stats[0].dex_mod,
              constitution_mod: stats[0].con_mod,
              intelligence_mod: stats[0].int_mod,
              wisdom_mod: stats[0].wis_mod,
              charisma_mod: stats[0].cha_mod,

              // Illusion
              diplomacy: stats[0].diplomacy,
              diplomacy_mod: stats[0].dip_mod,

              // Aventure
              social: stats[0].social,
              mental: stats[0].mental,
              physic: stats[0].physic,

              // Skill Expertises
              proficiency_bonus: stats[0].proficiency_bonus,
              skill_proficiency: stats[0].skill_proficiency,
              skill_expertise: stats[0].skill_expertise,
            };

            setCaracterisctics(caracterisctics);
          });
        fetch(API_URL + "characterhealth/" + json[0].character_health)
          .then((response) => response.json())
          .then((health) => {
            let charaHealth = health[0];
            setCharaHeader(charaHealth);
          });
        setCharacter(json[0]);
      });
    fetch(API_URL + "skillset/" + hardcoded_skillset)
      .then((response) => response.json())
      .then(async (skillset) => {
        const skill_id_list = skillset[0].skill_list.split(",");
        const skill_list = await Promise.all(
          skill_id_list
            .filter((skill_id) => skill_id !== "")
            .map((skill_id) =>
              fetch(API_URL + "skill/" + skill_id)
                .then((response) => response.json())
                .then((skill) => skill[0])
            )
        );

        skill_list.sort((a, b) => a.skill_name.localeCompare(b.skill_name));
        setSkills(skill_list);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des compétences :", error);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item sm={12} lg={8}>
            <MDBox mb={1}>
              <CharaHeaderCard health={charaHeader} character={character} />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={6}>
            <MDBox mb={1.5}>
              <StatisticsCard
                color="dark"
                stats={caracterisctics}
                setStat={setCaracterisctics}
                stat_id={caracterisctics.id}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <SkillsCard skillList={skills} stats={caracterisctics} />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Stats;
