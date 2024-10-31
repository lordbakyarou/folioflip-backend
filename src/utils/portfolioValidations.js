const validator = require("validator");

const portfolioValidation = ({
  portfolioName,
  about,
  timeline,
  skills,
  projects,
  social_handles,
  services,
  testimonials,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate portfolio name
      if (
        !portfolioName ||
        !validator.isLength(portfolioName, { min: 3, max: 50 })
      ) {
        throw new Error("Portfolio name must be between 3 & 50");
      }

      // Call validations for each section
      if (about) {
        await aboutValidation(about);
      }
      if (timeline?.length > 0) {
        await Promise.all(timeline?.map((t) => timelineValidation(t)));
      }
      if (skills?.length > 0) {
        await Promise.all(skills.map((s) => skillsValidation(s)));
      }
      if (projects?.length > 0) {
        await Promise.all(projects.map((p) => projectValidation(p)));
      }
      if (social_handles?.length > 0) {
        await Promise.all(social_handles.map((s) => socialHandleValidation(s)));
      }
      if (services?.length > 0) {
        await Promise.all(services.map((s) => serviceValidation(s)));
      }
      if (testimonials?.length > 0) {
        await Promise.all(testimonials.map((t) => testimonialValidation(t)));
      }

      resolve("Validation successful");
    } catch (error) {
      reject({ status: error?.status || 400, message: error?.message });
    }
  });
};

const aboutValidation = (about) => {
  return new Promise((res, rej) => {
    try {
      // Check if the about section exists
      if (!about) throw new Error("About section is required");

      // Validate name
      if (
        !about?.name ||
        !validator.isLength(about?.name, { min: 3, max: 50 })
      ) {
        throw new Error("About name must be between 3 and 50 characters long");
      }

      // Validate title
      if (
        about?.title &&
        !validator.isLength(about?.title, { min: 3, max: 100 })
      ) {
        throw new Error("Title must be between 3 and 100 characters long");
      }

      // Validate subtitle
      if (
        about?.subTitle &&
        !validator.isLength(about?.subTitle, { max: 150 })
      ) {
        throw new Error("Subtitle must be less than 150 characters long");
      }

      // Validate description
      if (
        about?.description &&
        !validator.isLength(about?.description, { max: 500 })
      ) {
        throw new Error("Description must be less than 500 characters long");
      }

      // Validate quote
      if (about?.quote && !validator.isLength(about?.quote, { max: 200 })) {
        throw new Error("Quote must be less than 200 characters long");
      }

      // Validate experience years
      if (typeof about?.exp_year != "number" || about?.exp_year < 0) {
        throw new Error("Experience years cannot be less than 0");
      }

      // Validate address
      if (about?.address && !validator.isLength(about?.address, { max: 200 })) {
        throw new Error("Address must be less than 200 characters long");
      }

      // Validate some_total
      if (typeof about?.some_total != "number" || about?.some_total < 0) {
        throw new Error("Total cannot be less than 0");
      }

      // Validate phone number
      if (
        about?.phoneNumber &&
        !validator.isMobilePhone(about?.phoneNumber, "any")
      ) {
        throw new Error("Invalid phone number");
      }

      // Validate contact email
      if (!validator.isEmail(about?.contactEmail)) {
        throw new Error("Invalid contact email");
      }

      // Validate avatar URL
      if (
        about?.avatar &&
        about?.avatar.url &&
        !validator.isURL(about?.avatar.url)
      ) {
        throw new Error("Avatar URL is not valid");
      }

      // Validate alternate avatars
      if (about?.alternateAvatars) {
        about?.alternateAvatars.forEach((avatar, index) => {
          if (avatar.url && !validator.isURL(avatar?.url)) {
            throw new Error(
              `Alternate avatar URL at index ${index} is not valid`
            );
          }
        });
      }

      res("All validations passed!");
    } catch (error) {
      console.log(error.message);
      rej({ status: error?.status || 400, message: error?.message });
    }
  });
};

const timelineValidation = (timeline) => {
  return new Promise((res, rej) => {
    try {
      // Check if the timeline object exists
      if (!timeline) throw new Error("Timeline section is required");

      // Validate company name
      if (
        !timeline?.company_name ||
        !validator.isLength(timeline?.company_name, { min: 3, max: 50 })
      ) {
        throw new Error(
          "Timeline company name between 3 and 50 characters long"
        );
      }

      // Validate summary
      if (
        !timeline?.summary ||
        !validator.isLength(timeline?.summary, { min: 3, max: 200 })
      ) {
        throw new Error("Summary must be between 3 and 200 characters long");
      }

      // Validate sequence
      if (typeof timeline?.sequence != "number" || timeline?.sequence < 1) {
        //not taking numbers why?
        throw new Error("Sequence must be at least 1");
      }

      // Validate start date
      if (!timeline?.startDate || !validator.isISO8601(timeline?.startDate)) {
        throw new Error("Invalid start date format");
      }

      // Validate end date
      if (timeline?.endDate && !validator.isISO8601(timeline?.endDate)) {
        throw new Error("Invalid end date format");
      }

      // Check that the end date is after the start date
      if (
        timeline?.endDate &&
        new Date(timeline?.endDate) <= new Date(timeline?.startDate)
      ) {
        throw new Error("End date must be after the start date");
      }

      // Validate job title
      if (
        !timeline?.jobTitle ||
        !validator.isLength(timeline?.jobTitle, { min: 3, max: 50 })
      ) {
        throw new Error("Job title must be between 3 and 50 characters long");
      }

      // Validate job location
      if (
        !timeline?.jobLocation ||
        !validator.isLength(timeline?.jobLocation, { min: 3, max: 50 })
      ) {
        throw new Error(
          "Job location must be between 3 and 50 characters long"
        );
      }

      // Validate bullet points
      if (
        Array.isArray(timeline?.bulletPoints) &&
        timeline?.bulletPoints.length === 0
      ) {
        throw new Error("Bullet points must contain at least one item");
      }

      // Validate boolean fields
      if (typeof timeline?.forEducation != "boolean")
        throw new Error("For education must be a boolean value");

      if (typeof timeline?.enabled != "boolean")
        throw new Error("Enabled must be a boolean value");

      // If all validations pass
      res("All validations passed!");
    } catch (error) {
      rej({ status: error?.status || 400, message: error?.message });
    }
  });
};

const skillsValidation = (skill) => {
  return new Promise((resolve, reject) => {
    try {
      // Check if the skill object exists
      if (!skill) throw new Error("Skill section is required");

      // Validate skill name
      if (
        !skill?.name ||
        !validator.isLength(skill?.name, { min: 2, max: 50 })
      ) {
        throw new Error("Skill name between 3 and 50 characters long");
      }

      // Validate percentage
      if (
        typeof skill?.percentage !== "number" ||
        skill?.percentage < 0 ||
        skill?.percentage > 100
      ) {
        throw new Error("Skill percentage must be between 0 and 100");
      }

      // Validate sequence
      if (typeof skill?.sequence != "number" || skill?.sequence < 1) {
        throw new Error("Sequence must be at least 1");
      }

      // Validate image URL
      if (
        !skill?.image ||
        !skill?.image?.url ||
        !validator.isURL(skill?.image.url)
      ) {
        throw new Error("Image URL is required and must be a valid URL");
      }

      // Validate image public ID
      if (!skill?.image?.public_id) {
        throw new Error("Image public ID is required");
      }

      // Validate boolean fields
      if (typeof skill?.enabled !== "boolean") {
        throw new Error("Enabled must be a boolean value");
      }

      // If all validations pass
      resolve("All validations passed!");
    } catch (error) {
      reject({ status: error?.status || 400, message: error?.message });
    }
  });
};

const projectValidation = (project) => {
  return new Promise((resolve, reject) => {
    try {
      // Check if the project object exists
      if (!project) throw new Error("Project section is required");

      // Validate title
      if (
        !project?.title ||
        !validator.isLength(project?.title, { min: 3, max: 50 })
      ) {
        throw new Error(
          "Project title must be between 3 and 50 characters long"
        );
      }

      // Validate live URL
      if (!project?.liveurl || !validator.isURL(project?.liveurl)) {
        throw new Error("Invalid Live URL format");
      }

      // Validate GitHub URL
      if (project?.githuburl && !validator.isURL(project?.githuburl)) {
        throw new Error("Invalid GitHub URL format");
      }

      // Validate sequence
      if (typeof project?.sequence != "number" || project?.sequence < 1) {
        throw new Error("Sequence must be at least 1");
      }

      // Validate image
      if (!project?.image || !project?.image?.public_id) {
        throw new Error("Image public ID is required");
      }
      if (!project?.image?.url || !validator.isURL(project?.image?.url)) {
        throw new Error("Image URL is required and must be a valid URL");
      }

      // Validate description
      if (
        !project?.description ||
        !validator.isLength(project?.description, { min: 10, max: 500 })
      ) {
        throw new Error(
          "Description must be between 10 and 500 characters long"
        );
      }

      // Validate tech stack
      if (
        !Array.isArray(project?.techStack) ||
        project?.techStack?.length === 0
      ) {
        throw new Error("Tech stack must contain at least one technology");
      }

      // Validate enabled field
      if (typeof project?.enabled !== "boolean") {
        throw new Error("Enabled must be a boolean value");
      }

      // If all validations pass
      resolve("All validations passed!");
    } catch (error) {
      reject({ status: error?.status || 400, message: error?.message });
    }
  });
};

const socialHandleValidation = (social_handle) => {
  return new Promise((resolve, reject) => {
    try {
      // Check if the social_handle object exists
      if (!social_handle) throw new Error("Social handle section is required");

      // Validate platform
      if (
        !social_handle.platform ||
        !validator.isLength(social_handle.platform, { min: 2, max: 50 })
      ) {
        throw new Error(
          "Platform name must be between 3 and 50 characters long"
        );
      }

      // Validate URL
      if (!social_handle.url || !validator.isURL(social_handle.url)) {
        throw new Error("Invalid URL format");
      }

      // Validate image
      if (!social_handle.image || !social_handle.image.public_id) {
        throw new Error("Image public ID is required");
      }
      if (
        !social_handle.image.url ||
        !validator.isURL(social_handle.image.url)
      ) {
        throw new Error("Image URL is required and must be a valid URL");
      }

      // Validate enabled field
      if (typeof social_handle.enabled !== "boolean") {
        throw new Error("Enabled must be a boolean value");
      }

      // If all validations pass
      resolve("All validations passed!");
    } catch (error) {
      reject({ status: error?.status || 400, message: error?.message });
    }
  });
};

const serviceValidation = (service) => {
  return new Promise((resolve, reject) => {
    try {
      // Check if the service object exists
      if (!service) throw new Error("Service section is required");

      // Validate service name
      if (!service?.name || !validator.isLength(service?.name, { min: 2 })) {
        throw new Error("Service name must be at least 2 characters long");
      }

      // Validate charge
      if (
        !service?.charge ||
        !validator.isCurrency(service?.charge, { allow_negatives: false })
      ) {
        throw new Error("Invalid service charge format");
      }

      // Validate description
      if (
        !service?.desc ||
        !validator.isLength(service?.desc, { min: 10, max: 500 })
      ) {
        throw new Error(
          "Description must be between 10 and 500 characters long"
        );
      }

      // Validate image
      if (!service?.image || !service?.image.public_id) {
        throw new Error("Image public ID is required");
      }
      if (!service?.image.url || !validator.isURL(service?.image.url)) {
        throw new Error("Image URL is required and must be a valid URL");
      }

      // Validate enabled field
      if (typeof service?.enabled !== "boolean") {
        throw new Error("Enabled must be a boolean value");
      }

      // If all validations pass
      resolve("All validations passed!");
    } catch (error) {
      reject({ status: error?.status || 400, message: error?.message });
    }
  });
};

const testimonialValidation = (testimonial) => {
  return new Promise((resolve, reject) => {
    try {
      // Check if the testimonial object exists
      if (!testimonial) throw new Error("Testimonial section is required");

      // Validate name
      if (!testimonial?.name) {
        throw new Error("Testimonial name is required");
      }
      if (!validator.isLength(testimonial?.name, { min: 2, max: 50 })) {
        throw new Error(
          "Testimonial name must be between 2 and 50 characters long"
        );
      }

      // Validate review
      if (!testimonial?.review) {
        throw new Error("Review is required");
      }
      if (!validator.isLength(testimonial?.review, { min: 10, max: 500 })) {
        throw new Error(
          "Testimonial review must be between 10 and 500 characters long"
        );
      }

      // Validate position
      if (!testimonial?.position) {
        throw new Error("Position is required");
      }
      if (!validator.isLength(testimonial?.position, { min: 2, max: 50 })) {
        throw new Error("Position must be between 2 and 50 characters long");
      }

      // Validate image
      if (!testimonial?.image || !testimonial?.image?.public_id) {
        throw new Error("Image public ID is required");
      }
      if (
        !testimonial?.image?.url ||
        !validator.isURL(testimonial?.image?.url)
      ) {
        throw new Error("Image URL is required and must be a valid URL");
      }

      // Validate enabled field
      if (typeof testimonial?.enabled !== "boolean") {
        throw new Error("Enabled must be a boolean value");
      }

      // If all validations pass
      resolve("All validations passed!");
    } catch (error) {
      reject({ status: error?.status || 400, message: error?.message });
    }
  });
};

module.exports = { portfolioValidation };
