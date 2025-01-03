package com.dev.caps.backend.models

import jakarta.persistence.*
import java.util.UUID

@Entity
@Table(name = "users")
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: UUID = UUID.randomUUID()

    @Column(unique = true, nullable = false)
    var username: String = ""

    @Column(unique = true, nullable = false)
    var email: String = ""

    @Column
    var password: String = ""

    @Enumerated(EnumType.STRING)
    var role: Role = Role.USER
}

data class UserDto(
    val id: UUID,
    val username: String,
    val email: String,
)

fun User.toDto() = UserDto(id, username, email)