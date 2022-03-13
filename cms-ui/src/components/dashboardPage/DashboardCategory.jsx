import styles from "./DashboardCategory.module.scss"
import DeleteButton from "components/shared/buttons/DeleteButton"
import { apiUrl } from "utils/constants/env"
import editIcon from "static/icons/edit.svg"

const DashboardCategory = ({ category, onEditClick }) => {
  return (
    <tr className={styles.dashboardCategory}>
      <td className={styles.dashboardCategory__id}>{category.id}</td>

      <td className={styles.dashboardCategory__title}> {category.title}</td>
      <td className={styles.dashboardCategory__description}>
        {category.description}
      </td>
      <td className={styles.dashboardCategory__edit}>
        <button onClick={() => onEditClick(category)}>
          <img
            className={styles.dashboardCategory__edit__icon}
            src={editIcon}
            alt="edit category"
          />
        </button>
      </td>
      <td className={styles.dashboardCategory__delete}>
        <DeleteButton url={apiUrl + "/categories/" + category.id} />
      </td>
    </tr>
  )
}

export default DashboardCategory
