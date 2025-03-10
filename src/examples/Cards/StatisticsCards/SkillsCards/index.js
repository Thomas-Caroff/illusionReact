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

// prop-types is a library for typechecking of props
// import PropTypes from "prop-types";

// @mui material components
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Button, Grid, Checkbox, Card, Divider, Icon } from "@mui/material";
import MDInput from "components/MDInput";
import { useState, useEffect } from "react";

import { API_URL } from "constants";

function SkillsCard({ skillList, stats }) {
  const [statForm, setStats] = useState({ stats });
  const [form, setForm] = useState({ skillList });
  const [isSkillEditable, setIsSkillEditable] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [isFormAltered, setIsFormAltered] = useState(false);

  const modifier_linking = {
    STR: stats.strength_mod,
    DEX: stats.dexterity_mod,
    CON: stats.constitution_mod,
    INT: stats.intelligence_mod,
    WIS: stats.wisdom_mod,
    CHA: stats.charisma_mod,
  };

  const proficiency_list = statForm?.skill_proficiency?.split(",");
  const expertise_list = statForm?.skill_expertise?.split(",");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const updatedSkillList = skillList.map((skill) => ({
      ...skill,
      left: proficiency_list?.includes(skill.pk),
      right: expertise_list?.includes(skill.pk),
    }));

    setForm(updatedSkillList);
    setStats(stats);
  }, [skillList, stats]);

  async function switchEditable() {
    if (isSkillEditable && isFormAltered) {
      const skillProficiency = form
        .filter((skill) => skill.left || skill.right)
        .map((skill) => skill.pk)
        .join(",");

      const skillExpertise = form
        .filter((skill) => skill.left && skill.right)
        .map((skill) => skill.pk)
        .join(",");

      const updatedStatForm = {
        ...statForm,
        skill_proficiency: skillProficiency,
        skill_expertise: skillExpertise,
      };

      try {
        const response = await fetch(API_URL + "characterstats/" + stats.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStatForm),
        });

        if (response.ok) {
          setSnackbarMessage("Statistiques mises à jour avec succès !");
          setSnackbarSeverity("success");
          setIsFormAltered(false);
        } else {
          setSnackbarMessage("Erreur lors de la mise à jour des statistiques.");
          setSnackbarSeverity("error");
        }
      } catch (error) {
        setSnackbarMessage("Erreur réseau : " + error.message);
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    }
    setIsSkillEditable(!isSkillEditable);
  }

  const onChange = (e) => {
    setIsFormAltered(true);
    setStats({
      ...statForm,
      [e.target.id]: e.target.value,
    });
  };

  // Fonction pour gérer les modifications des cases à cocher
  const handleCheckboxChange = (index, side) => {
    setIsFormAltered(true);
    const updatedSkills = [...form];
    updatedSkills[index][side] = !updatedSkills[index][side];
    setForm(updatedSkills);
  };

  return (
    <Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Fermer automatiquement après 4 secondes
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <MDBox display="flex" justifyContent="space_around" alignItems="left">
        <Grid sm={10} px={5} py={1}>
          <MDBox textAlign="left">
            <MDTypography
              textAlign="left"
              my={1}
              variant="h4"
              display="inline"
              color="dark"
              sx={{
                fontSize: "1.25rem",
              }}
            >
              Bonus de maitrise :&nbsp;
            </MDTypography>
            {!isSkillEditable ? (
              <MDTypography
                textAlign="left"
                variant="h4"
                color="dark"
                display="inline"
                sx={{
                  fontSize: "1.25rem",
                }}
              >
                {statForm.proficiency_bonus}
              </MDTypography>
            ) : (
              <MDInput
                variant="outlined"
                textAlign="left"
                color="dark"
                display="inline"
                type="number"
                sx={{
                  width: "3rem",
                  textAlign: "Center",
                }}
                id="proficiency_bonus"
                value={statForm.proficiency_bonus}
                onChange={onChange}
              />
            )}
          </MDBox>
        </Grid>
        <Grid sm={2}>
          <Button color="dark" onClick={switchEditable}>
            <Icon>settings</Icon>
          </Button>
        </Grid>
      </MDBox>
      <Divider />
      <MDBox px={1}>
        {skillList.map((skill, index) => (
          <Grid container alignItems="center" spacing={0} key={index}>
            <Grid item sm={1} px={1}>
              <Checkbox
                checked={form[index]?.left ?? false}
                onChange={() => handleCheckboxChange(index, "left")}
                disabled={!isSkillEditable}
              />
            </Grid>

            <Grid item sm={1}>
              <Checkbox
                checked={form[index]?.right ?? false}
                onChange={() => handleCheckboxChange(index, "right")}
                disabled={!isSkillEditable}
              />
            </Grid>

            {/* Affichage du "modifier" */}
            <Grid item sm={2}>
              <MDBox
                textAlign="center"
                borderRadius="md"
                borderColor="dark"
                border="1px solid"
                width="3rem"
                height="2rem"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <MDTypography variant="h6">
                  {modifier_linking[skill.modified_by] +
                    (skill?.left | skill?.right ? (skill?.left != skill?.right ? 1 : 2) : 0) *
                      stats.proficiency_bonus}
                </MDTypography>
              </MDBox>
            </Grid>

            {/* Champ texte pour le "skill_name" */}
            <Grid item sm={6} px={2}>
              <MDTypography fullWidth variant="outlined">
                {skill?.skill_name}
              </MDTypography>
            </Grid>
          </Grid>
        ))}
      </MDBox>
    </Card>
  );
}

export default SkillsCard;
