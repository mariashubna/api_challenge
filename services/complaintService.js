import Complaint from "../db/models/Complaint.js";
import User from "../db/models/Users.js";

// Создать жалобу
export const createComplaint = async (userId, complaintText) => {
  return await Complaint.create({ userId, complaintText });
};

// Получить все жалобы (админ)
export const getAllComplaints = async () => {
  return await Complaint.findAll({
    include: [
      { model: User, as: "user", attributes: ["id", "email"] },
      { model: User, as: "admin", attributes: ["id", "email"] },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Получить жалобу по ID
export const getComplaintById = async (id) => {
  return await Complaint.findByPk(id, {
    include: [
      { model: User, as: "user", attributes: ["id", "email"] },
      { model: User, as: "admin", attributes: ["id", "email"] },
    ],
  });
};

// Добавить ответ (админ или суперадмин)
export const respondToComplaint = async (id, adminId, responseText) => {
  const complaint = await Complaint.findByPk(id);
  if (!complaint) throw new Error("Complaint not found");

  complaint.responseText = responseText;
  complaint.adminId = adminId;
  await complaint.save();

  return complaint;
};
