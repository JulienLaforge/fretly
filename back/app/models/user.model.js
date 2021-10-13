module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        email: String,
        password: String,
        type: String
      },
      { timestamps: false }
    )
  );

  return User;
};
