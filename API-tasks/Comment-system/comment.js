const avatarImages = [
  "cat.png",
  "chicken.png",
  "dinosaur.png",
  "hacker.png",
  "lion.png",
  "man.png",
  "meerkat.png",
  "panda.png",
  "profile.png",
  "rabbit.png",
];

const home = document.getElementById("home");
const disco = document.getElementById("disco");
const navHome = document.getElementById("nav-home");
const getStartedBtn = document.getElementById("getStarted");

getStartedBtn.addEventListener("click", openDisco);

navHome.addEventListener("click", (e) => {
  e.preventDefault();
  openHome();
});

function openHome() {
  home.style.display = "flex";
  disco.style.display = "none";
  navHome.classList.add("active");
}

function openDisco() {
  home.style.display = "none";
  disco.style.display = "flex";
  navHome.classList.remove("active");
}

function postCommentAPI(comment) {
  return fetch("api/comments", {
    method: "POST",
    body: JSON.stringify(comment)
  }).then(() => Promise.resolve(comment));
}

const commentList = document.getElementById("commentList");
const postBtn = document.getElementById("postBtn");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");

postBtn.addEventListener("click", async () => {
  let user = usernameInput.value.trim();
  let text = messageInput.value.trim();

  if (!user || !text) return;

  text = text.charAt(0).toUpperCase() + text.slice(1);

  const savedComment = await postCommentAPI({ user, text });
  renderComment(savedComment);

  messageInput.value = "";
});

function renderComment({ user, text }) {
  const commentEl = document.createElement("div");
  commentEl.className = "comment";

  const avatarDiv = document.createElement("div");
  avatarDiv.className = "avatar";

  const avatarImg = document.createElement("img");
  const randomAvatar =
    avatarImages[Math.floor(Math.random() * avatarImages.length)];

  avatarImg.src = "avatar-imgs/" + randomAvatar;
  avatarImg.alt = user;

  avatarDiv.appendChild(avatarImg);

  const contentDiv = document.createElement("div");
  contentDiv.className = "comment-content";

  const userSpan = document.createElement("span");
  userSpan.className = "comment-user";
  userSpan.textContent = user + ":";

  const textSpan = document.createElement("span");
  textSpan.className = "comment-text";
  textSpan.textContent = text;

  contentDiv.appendChild(userSpan);
  contentDiv.appendChild(textSpan);

  commentEl.appendChild(avatarDiv);
  commentEl.appendChild(contentDiv);

  commentEl.addEventListener("dblclick", () => {
    commentEl.remove();
  });

  commentList.appendChild(commentEl);
}
