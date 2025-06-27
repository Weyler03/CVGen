"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, FileText, Download, Palette, Layout, Users, Crown, Zap, Shield } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Múltiples Documentos",
    description: "CV, cartas de presentación y propuestas de empleo en una sola plataforma",
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Layouts Profesionales",
    description: "3 layouts diferentes: Tradicional, Barra Lateral y Moderno",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Personalización Total",
    description: "Colores, fuentes, espaciado y estilos completamente personalizables",
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Exportación PDF",
    description: "Descarga tus documentos en PDF de alta calidad para impresión",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Plantillas Múltiples",
    description: "Moderno, Clásico, Creativo y Personalizado para cada ocasión",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Datos Seguros",
    description: "Tu información se mantiene privada y segura en todo momento",
  },
]

const testimonials = [
  {
    name: "María González",
    role: "Desarrolladora Frontend",
    content: "Conseguí mi trabajo soñado gracias a mi CV creado con esta plataforma. ¡Increíble!",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Diseñador UX",
    content: "La personalización es fantástica. Pude crear un CV que realmente refleja mi estilo.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Gerente de Proyectos",
    content: "Perfecto para crear propuestas profesionales. Mis clientes quedan impresionados.",
    rating: 5,
  },
]

const pricingPlans = [
  {
    name: "Gratis",
    price: "$0",
    period: "para siempre",
    description: "Perfecto para empezar",
    features: [
      "1 CV básico",
      "2 plantillas (Moderno y Clásico)",
      "Exportación PDF básica",
      "Guardado local",
      "Soporte por email",
    ],
    limitations: [
      "Sin personalización avanzada",
      "Sin cartas de presentación",
      "Sin propuestas de empleo",
      "Marca de agua en PDF",
    ],
    buttonText: "Comenzar Gratis",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/mes",
    description: "Para profesionales activos",
    features: [
      "CVs ilimitados",
      "Todas las plantillas y layouts",
      "Personalización completa",
      "Cartas de presentación",
      "Propuestas de empleo",
      "Exportación PDF premium",
      "Guardado en la nube",
      "Soporte prioritario",
    ],
    limitations: [],
    buttonText: "Comenzar Prueba Gratis",
    buttonVariant: "default" as const,
    popular: true,
    savings: null,
  },
  {
    name: "Pro Trimestral",
    price: "$24.99",
    period: "/3 meses",
    originalPrice: "$29.97",
    description: "Ahorra 17% pagando trimestral",
    features: [
      "Todo lo del plan Pro",
      "3 meses de acceso completo",
      "Ahorro de $4.98",
      "Facturación trimestral",
      "Cancela cuando quieras",
    ],
    limitations: [],
    buttonText: "Elegir Trimestral",
    buttonVariant: "default" as const,
    popular: false,
    savings: "17%",
  },
  {
    name: "Pro Anual",
    price: "$79.99",
    period: "/año",
    originalPrice: "$119.88",
    description: "Máximo ahorro - 33% de descuento",
    features: [
      "Todo lo del plan Pro",
      "12 meses de acceso completo",
      "Ahorro de $39.89",
      "Facturación anual",
      "Acceso a nuevas funciones",
      "Soporte VIP",
    ],
    limitations: [],
    buttonText: "Elegir Anual",
    buttonVariant: "default" as const,
    popular: false,
    savings: "33%",
  },
]

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly" | "annual">("monthly")

  const filteredPlans = pricingPlans.filter((plan) => {
    if (plan.name === "Gratis") return true
    if (billingCycle === "monthly" && plan.name === "Pro") return true
    if (billingCycle === "quarterly" && plan.name === "Pro Trimestral") return true
    if (billingCycle === "annual" && plan.name === "Pro Anual") return true
    return false
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DocuPro
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Características
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Precios
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                Testimonios
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost">Iniciar Sesión</Button>
              </Link>
              <Link href="/">
                <Button>Comenzar Gratis</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Crown className="w-4 h-4 mr-1" />
              Generador #1 de Documentos Profesionales
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Crea Documentos
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Profesionales{" "}
            </span>
            en Minutos
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Genera CVs impresionantes, cartas de presentación convincentes y propuestas de empleo ganadoras con nuestras
            plantillas profesionales y herramientas de personalización avanzadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Zap className="w-5 h-5 mr-2" />
                Comenzar Gratis Ahora
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Ver Demo en Vivo
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            ✨ No requiere tarjeta de crédito • 🚀 Configuración en 2 minutos • 💯 Garantía de satisfacción
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Todo lo que Necesitas para Destacar</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas profesionales diseñadas para ayudarte a conseguir el trabajo de tus sueños
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Planes que se Adaptan a Ti</h2>
            <p className="text-xl text-gray-600 mb-8">
              Desde gratis hasta profesional. Elige el plan perfecto para tus necesidades.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm ${billingCycle === "monthly" ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                Mensual
              </span>
              <div className="flex bg-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingCycle === "monthly"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Mensual
                </button>
                <button
                  onClick={() => setBillingCycle("quarterly")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingCycle === "quarterly"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Trimestral
                  <Badge className="ml-2 bg-green-100 text-green-800 text-xs">-17%</Badge>
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingCycle === "annual" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Anual
                  <Badge className="ml-2 bg-green-100 text-green-800 text-xs">-33%</Badge>
                </button>
              </div>
              <span className={`text-sm ${billingCycle === "annual" ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                Anual
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {filteredPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular ? "border-blue-500 shadow-lg scale-105" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Más Popular
                    </Badge>
                  </div>
                )}
                {plan.savings && (
                  <div className="absolute -top-4 right-4">
                    <Badge className="bg-green-500 text-white">Ahorra {plan.savings}</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                    </div>
                    {plan.originalPrice && (
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="line-through">{plan.originalPrice}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Incluye:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Limitaciones:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitationIndex) => (
                          <li key={limitationIndex} className="flex items-start">
                            <span className="w-5 h-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0">×</span>
                            <span className="text-gray-500 text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link href="/" className="block">
                    <Button
                      variant={plan.buttonVariant}
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          : ""
                      }`}
                      size="lg"
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">¿Necesitas algo más específico?</p>
            <Button variant="outline" size="lg">
              Contactar Ventas
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que Dicen Nuestros Usuarios</h2>
            <p className="text-xl text-gray-600">Miles de profesionales ya han conseguido sus trabajos soñados</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para Conseguir tu Próximo Trabajo?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de profesionales que ya han transformado sus carreras con DocuPro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Zap className="w-5 h-5 mr-2" />
                Comenzar Gratis Ahora
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              Hablar con Ventas
            </Button>
          </div>
          <p className="text-blue-100 text-sm mt-4">Prueba gratuita de 14 días • No se requiere tarjeta de crédito</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">DocuPro</span>
              </div>
              <p className="text-gray-400">
                La plataforma líder para crear documentos profesionales que te ayudan a conseguir el trabajo de tus
                sueños.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Plantillas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Estado del Servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Comunidad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Carreras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Prensa
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 DocuPro. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Términos
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
