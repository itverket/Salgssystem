import React, { useEffect, useState } from "react";
import Status from "../../constants/Status";
import { useDeepCompareEffect } from "../../hooks";
import Case from "../../models/Case";
import DeleteCardMenu from "../DeleteCardMenu/DeleteCardMenu";
import TagContainer from "../TagContainer/TagContainer";
import styles from "./CaseCard.module.css";

interface CaseCardProps {
  caseObject: Case;
  slettCase: (kolonneId: Status, kortId: string) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseObject, slettCase }) => {
  const [caseState, setCaseState] = useState<Case>(caseObject);
  const [formValues, setFormValues] = useState<Case>(caseObject);
  const [showDeleteCardMenu, setShowDeleteCardMenu] = useState(false);

  const {
    ansvarlig,
    caseTags,
    dato,
    frist,
    kontakt,
    kunde,
    profilert,
  } = formValues;

  useEffect(() => {
    // Lytter til oppdateringer på tags
    setCaseState(formValues);
  }, [formValues.caseTags]);

  useDeepCompareEffect((_) => {
    caseObject.saveCase(caseState);
  }, caseState);

  const handleCardBlur = (event) => {
    setCaseState(formValues);
  };

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    } as Pick<Case, keyof Case>);
  };

  const handleMultilineInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value.split("\n"),
    } as Pick<Case, keyof Case>);
  };

  const handleTagsChange = (caseTags) => {
    setFormValues({
      ...formValues,
      caseTags: caseTags,
    } as Pick<Case, keyof Case>);
  };

  const handleCardDoubleClick = (event) => {
    event.target.blur();
    getSelection().empty();
    setShowDeleteCardMenu(true);
  };

  const handleDeleteCaseClick = () => {
    caseObject.deleteCase();
    // Oppdater state til DND
    slettCase(caseObject.status, caseObject.ID);
    setShowDeleteCardMenu(false);
  };

  return (
    <div
      className={styles.card}
      onBlur={(e) => handleCardBlur(e)}
      onDoubleClick={(e) => handleCardDoubleClick(e)}
    >
      <DeleteCardMenu
        show={showDeleteCardMenu}
        setShow={setShowDeleteCardMenu}
        deleteCard={handleDeleteCaseClick}
      />
      <div className={styles.header}>
        <div className={styles.customerAvatar}></div>
        <div className={styles.ownerAvatar}>{ansvarlig}</div>
      </div>
      <div className={styles.details}>
        <div>{dato?.toLocaleDateString()}</div>
        <input
          name="kontakt"
          placeholder="Kontakt"
          defaultValue={kontakt}
          onChange={handleInputChange}
        />
        <TagContainer caseTags={caseTags} onChangeTags={handleTagsChange} />
        <textarea
          name="profilert"
          placeholder="Profilert"
          defaultValue={profilert?.join("\n")}
          onChange={handleMultilineInputChange}
        />
      </div>
    </div>
  );
};

export default CaseCard;