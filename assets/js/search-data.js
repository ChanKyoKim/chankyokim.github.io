// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Papers and preprints, newest first. Selected work also appears on the about page.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Multimodal reasoning, robot learning, and geometric representations — with demonstrations and measured outcomes.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-notes",
          title: "notes",
          description: "Research notes on world models, spatial reasoning, and learning through execution.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "Robot learning, multimodal reasoning, and spatial intelligence. Updated October 22, 2026.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Courses I have taught as a Graduate Student Instructor at the University of Michigan.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "news-reductive-lie-neurons-equivariant-networks-for-general-linear-symmetries-on-lie-algebras-accepted-to-icml-2026-and-presented-at-the-conference-in-july-arxiv-project-page",
          title: 'Reductive Lie Neurons — equivariant networks for general linear symmetries on Lie algebras...',
          description: "",
          section: "News",},{id: "news-joined-the-world-foundation-model-team-at-toyota-research-institute-los-altos-ca-as-a-research-scientist-intern-building-foundation-models-for-driving-and-robotics",
          title: 'Joined the World Foundation Model team at Toyota Research Institute (Los Altos, CA)...',
          description: "",
          section: "News",},{id: "news-awarded-the-sk-hynix-global-researcher-scholarship-efficient-ai-training-amp-amp-inference",
          title: 'Awarded the SK hynix Global Researcher Scholarship (efficient AI training &amp;amp;amp; inference).',
          description: "",
          section: "News",},{id: "news-new-preprint-on-arxiv-e3dgs-unified-geometric-photometric-equivariance-for-3d-gaussian-splatting-via-color-as-geometry-embedding-we-show-that-low-degree-spherical-harmonic-color-is-algebraically-isomorphic-to-a-rank-2-geometric-tensor-enabling-a-unified-mathfrak-gl-3-embedding-for-se-3-equivariant-3dgs-without-clebsch-gordan-tensor-products-arxiv",
          title: 'New preprint on arXiv: E3DGS: Unified Geometric-Photometric Equivariance for 3D Gaussian Splatting via...',
          description: "",
          section: "News",},{id: "news-started-a-collaboration-with-prof-xingxing-zuo-s-group-at-mbzuai-on-gaussian-splatting-world-models-for-robot-manipulation-first-results-a-learned-dynamics-model-over-the-splats-planned-through-with-mppi-takes-a-24-task-push-to-goal-benchmark-from-0-24-to-69-per-attempt-project-page",
          title: 'Started a collaboration with Prof. Xingxing Zuo’s group at MBZUAI on Gaussian-splatting world...',
          description: "",
          section: "News",},{id: "news-ginio-accepted-to-corl-2026-687-of-2-094-submissions-a-learned-inertial-measurement-whose-mean-transforms-as-a-vector-and-whose-covariance-transforms-as-a-tensor-under-any-imu-mounting-so-a-physically-remounted-imu-on-a-real-robot-drops-from-8-15-m-to-0-50-m-ate-with-no-retraining-project-page",
          title: 'GINIO accepted to CoRL 2026 (687 of 2,094 submissions). A learned inertial measurement...',
          description: "",
          section: "News",},{id: "news-actionguide-our-work-on-action-grounded-multimodal-reasoning-for-closed-loop-driving-has-been-submitted-to-iclr-2027",
          title: 'ActionGuide, our work on action-grounded multimodal reasoning for closed-loop driving, has been submitted...',
          description: "",
          section: "News",},{id: "projects-gaussian-world-model",
          title: 'Gaussian World Model',
          description: "A learned dynamics model over a 3D Gaussian scene — rigid-body pose updates on the splats — with a sampling planner in closed loop on top; on the Pushing Gaussians benchmark, from 0/24 to 69% per attempt.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/gaussian-world-model/";
            },},{id: "projects-e3dgs",
          title: 'E3DGS',
          description: "What is a good latent for a 3D Gaussian? One compact gl(3) embedding carries position, covariance and color together, so a single SE(3)-equivariant network processes a splat — no Clebsch–Gordan tensor products.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/e3dgs/";
            },},{id: "projects-reductive-lie-neurons",
          title: 'Reductive Lie Neurons',
          description: "Equivariant neural networks for general linear symmetries on Lie algebras — twists, covariances and Gaussian shape matrices transform lawfully with the frame they are expressed in.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/reln/";
            },},{id: "projects-rl-post-training-for-closed-loop-driving",
          title: 'RL post-training for closed-loop driving',
          description: "Improve a diffusion driving policy through feedback from its own closed-loop rollouts.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/rl-driving/";
            },},{id: "projects-actionguide-learning-transferable-action-grounded-reasoning-for-closed-loop-driving",
          title: 'ActionGuide: Learning Transferable Action-Grounded Reasoning for Closed-Loop Driving',
          description: "Multimodal reasoning that verifies candidate trajectories and guides a frozen driving planner.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/actionguide/";
            },},{id: "projects-ginio",
          title: 'GINIO',
          description: "A learned inertial measurement that obeys the geometry of its sensor — the mean transforms as a vector, the covariance as a tensor — under any IMU mounting, so the estimator downstream never sees a frame it was not trained for.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/ginio/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%68%61%6E%6B%79%6F@%75%6D%69%63%68.%65%64%75", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/chankyo-kim-603592238", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=nojc8DoAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
