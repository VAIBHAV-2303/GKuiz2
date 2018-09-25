package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           
)

var db *gorm.DB                                         
var err error

type Person struct {
   ID uint `json:"id"`
   FirstName string `json:"firstname"`
   LastName string `json:"lastname"`
   City string `json:"city"`
   Password string `json:"password"`
   TotalScore int `json:"totalScore"`
   MovieScore int `json:"movieScore"`
   SportsScore int `json:"sportsScore"`
   AdminStatus string `json:"adminStatus"`
}

type Attempted struct {
	ID uint `json:"id"`
	PersonId uint `json:"personId"`
	Category string `json:"category"`
	QuizNumber uint `json:"quizNumber"`
	Score uint `json:"score"`
}

type Question struct {
   ID uint `json:"id"`
   Question string `json:"question"`
   Type string `json:"typeOf"`
   QuizNumber uint `json:"quizNumber"`
   Category string `json:"category"`
   Option1 string `json:"option1"`
   Option3 string `json:"option2"`
   Option2 string `json:"option3"`
   Ans string `json:"ans"`
   Ans1 string `json:"ans1"`
   Ans2 string `json:"ans2"`
   Ans3 string `json:"ans3"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()
   db.AutoMigrate(&Attempted{})
   db.AutoMigrate(&Person{})
   db.AutoMigrate(&Question{})
   r := gin.Default()
   r.GET("/attempted/", GetAttempted)
   r.POST("/attempted", CreateAttempted)
   r.GET("/people/", GetPeople)                             
   r.GET("/people/:id", GetPerson)
   r.POST("/people", CreatePerson)
   r.DELETE("/people/:id", DeletePerson)
   r.GET("/questions/", GetQuestions)                             
   r.GET("/questions/:id", GetQuestion)
   r.POST("/questions", CreateQuestion)
   r.PUT("/people/:id", UpdatePerson)
   r.PUT("/questions/:id", UpdateQuestion)
   r.DELETE("/questions/:id", DeleteQuestion)
   r.Use((cors.Default()))
   r.Run(":8081")                                           
}

func CreateAttempted(c *gin.Context) {
   var attempted Attempted
   c.BindJSON(&attempted)
   db.Create(&attempted)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, attempted)
}

func GetAttempted(c *gin.Context) {
   var attempted []Attempted
   if err := db.Find(&attempted).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, attempted)
   }
}

func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func CreatePerson(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   db.Create(&person)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, person)
}

func GetPerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, person)
   }
}

func GetPeople(c *gin.Context) {
   var people []Person
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, people)
   }
}

func GetQuestions(c *gin.Context) {
   var question []Question
   if err := db.Find(&question).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, question)
   }
}

func GetQuestion(c *gin.Context) {
   id := c.Params.ByName("id")
   var question Question
   if err := db.Where("id = ?", id).First(&question).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, question)
   }
}

func CreateQuestion(c *gin.Context) {
   var question Question
   c.BindJSON(&question)
   db.Create(&question)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, question)
}

func DeleteQuestion(c *gin.Context) {
   id := c.Params.ByName("id")
   var question Question
   d := db.Where("id = ?", id).Delete(&question)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
   var person Person
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      fmt.Println(err)
      c.AbortWithStatus(404)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, person)
}

func UpdateQuestion(c *gin.Context) {
   var question Question
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&question).Error; err != nil {
      fmt.Println(err)
      c.AbortWithStatus(404)
   }
   c.BindJSON(&question)
   db.Save(&question)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, question)
}