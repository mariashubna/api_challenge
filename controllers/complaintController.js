import * as complaintService from "../services/complaintService.js";

// Создать жалобу
export const createComplaint = async (req, res) => {
  try {
    const { complaintText } = req.body;
    const userId = req.user?.id; // берём из токена

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!complaintText)
      return res.status(400).json({ message: "Complaint text is required" });

    const complaint = await complaintService.createComplaint(
      userId,
      complaintText
    );
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Получить все жалобы
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintService.getAllComplaints();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Получить жалобу по ID
export const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await complaintService.getComplaintById(id);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ответить на жалобу
export const respondToComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { responseText } = req.body;
    const adminId = req.user?.id;

    const updated = await complaintService.respondToComplaint(
      id,
      adminId,
      responseText
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
