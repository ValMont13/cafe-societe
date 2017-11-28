# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171128150508) do

  create_table "answers", force: :cascade do |t|
    t.integer "quizz_answers_id"
    t.integer "response_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quizz_answers_id"], name: "index_answers_on_quizz_answers_id"
    t.index ["response_id"], name: "index_answers_on_response_id"
  end

  create_table "editions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "questions", force: :cascade do |t|
    t.string "content"
    t.integer "quizz_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quizz_id"], name: "index_questions_on_quizz_id"
  end

  create_table "quizz_answers", force: :cascade do |t|
    t.integer "quizz_id"
    t.integer "user_id"
    t.integer "score"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quizz_id"], name: "index_quizz_answers_on_quizz_id"
    t.index ["user_id"], name: "index_quizz_answers_on_user_id"
  end

  create_table "quizzs", force: :cascade do |t|
    t.string "name"
    t.integer "edition_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["edition_id"], name: "index_quizzs_on_edition_id"
  end

  create_table "responses", force: :cascade do |t|
    t.string "value"
    t.boolean "solution"
    t.integer "question_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_responses_on_question_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
  end

end
