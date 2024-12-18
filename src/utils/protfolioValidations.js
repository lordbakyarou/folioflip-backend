const validator = require("validator");
const { BadRequest } = require("../errors/httpErrors");
const {
  isLength,
  isNumber,
  isMobilePhone,
  isEmail,
  isURL,
  isDate,
  isArray,
  isBoolean,
  isValidPercentage,
  checkInObject,
} = require("./commonUtils");

const portfolioValidations = ({
  portfolioName,
  clientPortfolioId,
  about,
  timelines,
  skills,
  projects,
  social_handles,
  services,
  testimonials,
}) => {
  if (!!portfolioName && !isLength(portfolioName, 3, 50)) {
    throw new BadRequest("Portfolio name must be between 3 & 50");
  }

  if (!!clientPortfolioId && !isLength(clientPortfolioId, 3, 50)) {
    throw new BadRequest(
      "Client portfolio id must be between 3 and 50 characters long"
    );
  }

  // Call validations for each section
  if (about) {
    aboutValidation(about);
  }
  if (timelines?.length > 0) {
    timelines?.map((t) => timelineValidation(t));
  }
  if (skills?.length > 0) {
    skills.map((s) => skillsValidation(s));
  }
  if (projects?.length > 0) {
    projects.map((p) => projectValidation(p));
  }
  if (social_handles?.length > 0) {
    social_handles.map((s) => socialHandleValidation(s));
  }
  if (services?.length > 0) {
    services.map((s) => serviceValidation(s));
  }
  if (testimonials?.length > 0) {
    testimonials.map((t) => testimonialValidation(t));
  }
};

const aboutValidation = (about) => {
  // Check if the about section exists
  if (!about) throw new BadRequest("About section is required");
  // Validate name

  if (checkInObject("name", about) && !isLength(about?.name, 3, 50)) {
    throw new BadRequest("About name must be between 3 and 50 characters long");
  }
  // Validate title
  if (checkInObject("title", about) && !isLength(about?.title, 3, 100)) {
    throw new BadRequest("Title must be between 3 and 100 characters long");
  }
  // Validate subtitle
  if (checkInObject("subTitle", about) && !isLength(about?.subTitle, 0, 150)) {
    throw new BadRequest("Subtitle must be less than 150 characters long");
  }
  // Validate description
  if (
    checkInObject("description", about) &&
    !isLength(about?.description, 0, 500)
  ) {
    throw new BadRequest("Description must be less than 500 characters long");
  }
  // Validate quote
  if (checkInObject("quote", about) && !isLength(about?.quote, 0, 200)) {
    throw new BadRequest("Quote must be less than 200 characters long");
  }
  // Validate experience years
  if (
    checkInObject("exp_year", about) &&
    (!isNumber(about?.exp_year) || about?.exp_year < 0)
  ) {
    throw new BadRequest("Experience years cannot be less than 0");
  }
  // Validate address
  if (checkInObject("address", about) && !isLength(about?.address, 0, 200)) {
    throw new BadRequest("Address must be less than 200 characters long");
  }
  // Validate some_total
  if (
    checkInObject("some_total", about) &&
    (!isNumber(about?.some_total) || about?.some_total < 0)
  ) {
    throw new BadRequest("Total cannot be less than 0");
  }
  // Validate phone number
  if (
    checkInObject("phoneNumber", about) &&
    !isMobilePhone(about?.phoneNumber)
  ) {
    throw new BadRequest("Invalid phone number");
  }
  // Validate contact email
  if (checkInObject("contactEmail", about) && !isEmail(about?.contactEmail)) {
    throw new BadRequest("Invalid contact email");
  }

  // Validate avatar URL
  if (
    checkInObject("avatar", about) &&
    !checkInObject("url", about.avatar) &&
    !isURL(about?.avatar?.url)
  ) {
    throw new BadRequest("Avatar URL is not valid");
  }
  // Validate alternate avatars
  if (checkInObject("alternateAvatars", about)) {
    about?.alternateAvatars.forEach((avatar, index) => {
      if (!checkInObject("url", avatar) && !isURL(avatar?.url)) {
        throw new BadRequest(
          `Alternate avatar URL at index ${index} is not valid`
        );
      }
    });
  }
};

const timelineValidation = (timeline) => {
  // Check if the timeline object exists
  if (!timeline) throw new BadRequest("Timeline section is required");
  // Validate company name
  if (
    checkInObject("company_name", timeline) &&
    !isLength(timeline?.company_name, 3, 50)
  ) {
    throw new BadRequest(
      "Timeline company name between 3 and 50 characters long"
    );
  }
  // Validate summary
  if (
    checkInObject("summary", timeline) &&
    !isLength(timeline?.summary, 3, 200)
  ) {
    throw new BadRequest("Summary must be between 3 and 200 characters long");
  }
  // Validate sequence
  if (checkInObject("sequence", timeline) && timeline?.sequence < 1) {
    //not taking numbers why?
    throw new BadRequest("Sequence must be at least 1");
  }
  // Validate start date
  if (checkInObject("startDate", timeline) && !isDate(timeline?.startDate)) {
    throw new BadRequest("Invalid start date format");
  }
  // Validate end date
  if (
    checkInObject("startDate", timeline) &&
    !checkInObject("endDate", timeline) &&
    !isDate(timeline?.endDate)
  ) {
    throw new BadRequest("Invalid end date format");
  }
  // Check that the end date is after the start date
  if (
    checkInObject("endDate", timeline) &&
    new Date(timeline?.endDate) <= new Date(timeline?.startDate)
  ) {
    throw new BadRequest("End date must be after the start date");
  }
  // Validate job title
  if (
    checkInObject("jobTitle", timeline) &&
    !isLength(timeline?.jobTitle, 3, 50)
  ) {
    throw new BadRequest("Job title must be between 3 and 50 characters long");
  }
  // Validate job location
  if (
    checkInObject("jobLocation", timeline) &&
    !isLength(timeline?.jobLocation, 3, 50)
  ) {
    throw new BadRequest(
      "Job location must be between 3 and 50 characters long"
    );
  }
  // Validate bullet points
  if (
    checkInObject("bulletPoints", timeline) &&
    !isArray(timeline?.bulletPoints) &&
    timeline?.bulletPoints.length === 0
  ) {
    throw new BadRequest("Bullet points must contain at least one item");
  }
  // Validate boolean fields
  if (
    checkInObject("forEducation", timeline) &&
    !isBoolean(timeline?.forEducation)
  )
    throw new BadRequest("For education must be a boolean value");
  if (checkInObject("enabled", timeline) && !isBoolean(timeline?.enabled))
    throw new BadRequest("Enabled must be a boolean value");
};

const skillsValidation = (skill) => {
  // Check if the skill object exists
  if (!skill) throw new BadRequest("Skill section is required");
  // Validate skill name
  if (checkInObject("name", skill) && !isLength(skill?.name, 1, 50)) {
    throw new BadRequest("Skill name between 1 and 50 characters long");
  }
  // Validate percentage
  if (
    checkInObject("percentage", skill) &&
    !isNumber(skill?.percentage) &&
    isValidPercentage(skill?.percentage)
  ) {
    throw new BadRequest("Skill percentage must be between 0 and 100");
  }
  // Validate sequence
  if (
    checkInObject("sequence", skill) &&
    !isNumber(skill?.sequence) &&
    skill?.sequence < 1
  ) {
    throw new BadRequest("Sequence must be at least 1");
  }
  // Validate image URL
  if (
    checkInObject("image", skill) &&
    !checkInObject("url", skill.image) &&
    !isURL(skill?.image?.url)
  ) {
    throw new BadRequest("Image URL is required and must be a valid URL");
  }
  // Validate boolean fields
  if (checkInObject("enabled", skill) && !isBoolean(skill?.enabled)) {
    throw new BadRequest("Enabled must be a boolean value");
  }
};

const projectValidation = (project) => {
  // Check if the project object exists
  if (!project) throw new BadRequest("Project section is required");
  // Validate title
  if (checkInObject("title", project) && !isLength(project?.title, 3, 50)) {
    throw new BadRequest(
      "Project title must be between 3 and 50 characters long"
    );
  }
  // Validate live URL
  if (checkInObject("liveurl", project) && !isURL(project?.liveurl)) {
    throw new BadRequest("Invalid Live URL format");
  }
  // Validate GitHub URL
  if (checkInObject("githuburl", project) && !isURL(project?.githuburl)) {
    throw new BadRequest("Invalid GitHub URL format");
  }
  // Validate sequence
  if (!isNumber(project?.sequence) && project?.sequence < 1) {
    throw new BadRequest("Sequence must be at least 1");
  }

  if (
    checkInObject("image", project) &&
    !checkInObject("url", project.image) &&
    !isURL(project?.image?.url)
  ) {
    //tbd
    throw new BadRequest("Image URL is required and must be a valid URL");
  }
  // Validate description
  if (
    checkInObject("description", project) &&
    !isLength(project?.description, 10, 500)
  ) {
    throw new BadRequest(
      "Description must be between 10 and 500 characters long"
    );
  }
  // Validate tech stack
  if (!isArray(project?.techStack) && project?.techStack?.length === 0) {
    throw new BadRequest("Tech stack must contain at least one technology");
  }
  // Validate enabled field
  if (checkInObject("enabled", project) && !isBoolean(project?.enabled)) {
    throw new BadRequest("Enabled must be a boolean value");
  }
};

const socialHandleValidation = (social_handle) => {
  // Check if the social_handle object exists
  if (!social_handle) throw new BadRequest("Social handle section is required");
  // Validate platform
  if (
    checkInObject("platform", social_handle) &&
    !isLength(social_handle?.platform, 2, 50)
  ) {
    throw new BadRequest(
      "Platform name must be between 3 and 50 characters long"
    );
  }
  // Validate URL
  if (
    checkInObject("url", social_handle) &&
    !validator.isURL(social_handle?.url)
  ) {
    throw new BadRequest("Invalid URL format");
  }

  if (
    checkInObject("image", social_handle) &&
    !checkInObject("url", social_handle?.image) &&
    !isURL(social_handle?.image.url)
  ) {
    throw new BadRequest("Image URL is required and must be a valid URL");
  }
  // Validate enabled field
  if (
    checkInObject("enabled", social_handle) &&
    !isBoolean(social_handle?.enabled)
  ) {
    throw new BadRequest("Enabled must be a boolean value");
  }
};

const serviceValidation = (service) => {
  // Check if the service object exists
  if (!service) throw new BadRequest("Service section is required");
  // Validate service name
  if (checkInObject("name", service) && !isLength(service?.name, 2)) {
    throw new BadRequest("Service name must be at least 2 characters long");
  }
  // Validate charge
  if (
    checkInObject("charge", service) &&
    !validator.isCurrency(service?.charge, { allow_negatives: false })
  ) {
    throw new BadRequest("Invalid service charge format");
  }
  // Validate description
  if (checkInObject("desc", service) && !isLength(service?.desc, 10, 500)) {
    throw new BadRequest(
      "Description must be between 10 and 500 characters long"
    );
  }
  if (
    checkInObject("image", service) &&
    !checkInObject("url", service.image) &&
    !isURL(service?.image?.url)
  ) {
    throw new BadRequest("Image URL is required and must be a valid URL");
  }
  // Validate enabled field
  if (checkInObject("enabled", service) && !isBoolean(service?.enabled)) {
    throw new BadRequest("Enabled must be a boolean value");
  }
};

const testimonialValidation = (testimonial) => {
  // Check if the testimonial object exists
  if (!testimonial) throw new BadRequest("Testimonial section is required");

  if (
    checkInObject("name", testimonial) &&
    !isLength(testimonial?.name, 2, 50)
  ) {
    throw new BadRequest(
      "Testimonial name must be between 2 and 50 characters long"
    );
  }

  if (
    checkInObject("review", testimonial) &&
    !isLength(testimonial?.review, 10, 500)
  ) {
    throw new BadRequest(
      "Testimonial review must be between 10 and 500 characters long"
    );
  }

  if (
    checkInObject("position", testimonial) &&
    !isLength(testimonial?.position, 2, 50)
  ) {
    throw new BadRequest("Position must be between 2 and 50 characters long");
  }

  if (
    checkInObject("image", testimonial) &&
    !checkInObject("url", testimonial.image) &&
    !isURL(testimonial?.image?.url)
  ) {
    throw new BadRequest("Image URL is required and must be a valid URL");
  }
  // Validate enabled field
  if (
    checkInObject("enabled", testimonial) &&
    !isBoolean(testimonial?.enabled)
  ) {
    throw new BadRequest("Enabled must be a boolean value");
  }
};

module.exports = { portfolioValidations };
