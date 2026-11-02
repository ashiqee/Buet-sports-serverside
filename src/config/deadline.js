// Official tournament registration deadline: 11 November 2026 at 23:59:59 BST (UTC+6)
const REGISTRATION_DEADLINE = new Date("2026-11-11T23:59:59+06:00");

const isRegistrationOpen = () => {
  return new Date() <= REGISTRATION_DEADLINE;
};

module.exports = {
  REGISTRATION_DEADLINE,
  isRegistrationOpen,
};
